import { cn } from "@/lib/utils";
import { Wind, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";

interface PollutionIndicatorProps {
  level: "low" | "medium" | "high";
  aqi?: number;
  pm25?: number;
  pm10?: number;
  location?: string;
  className?: string;
}

const PollutionIndicator = ({
  level,
  aqi,
  pm25,
  pm10,
  location,
  className,
}: PollutionIndicatorProps) => {
  const config = {
    low: {
      icon: CheckCircle,
      label: "Good Air Quality",
      description: "Great conditions for most plants!",
      bgColor: "bg-sage/10",
      borderColor: "border-sage/30",
      textColor: "text-sage",
      iconColor: "text-sage",
      barColor: "bg-sage",
      barWidth: "w-1/3",
    },
    medium: {
      icon: AlertCircle,
      label: "Moderate Pollution",
      description: "Consider pollution-resistant plants.",
      bgColor: "bg-sunlight-soft/40",
      borderColor: "border-sunlight/40",
      textColor: "text-earth",
      iconColor: "text-sunlight",
      barColor: "bg-sunlight",
      barWidth: "w-2/3",
    },
    high: {
      icon: AlertTriangle,
      label: "High Pollution",
      description: "We'll recommend hardy, air-purifying plants.",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/30",
      textColor: "text-destructive",
      iconColor: "text-destructive",
      barColor: "bg-destructive",
      barWidth: "w-full",
    },
  };

  const { icon: Icon, label, description, bgColor, borderColor, textColor, iconColor, barColor, barWidth } = config[level];

  return (
    <div
      className={cn(
        "rounded-2xl border-2 p-6 transition-all duration-300",
        bgColor,
        borderColor,
        className
      )}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", bgColor)}>
          <Icon className={cn("w-6 h-6", iconColor)} />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Wind className={cn("w-4 h-4", iconColor)} />
            <span className={cn("font-semibold", textColor)}>{label}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>

          {/* Pollution bar */}
          <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
            <div className={cn("h-full rounded-full transition-all duration-500", barColor, barWidth)} />
          </div>

          {/* Stats */}
          {(aqi || pm25 || pm10) && (
            <div className="flex flex-wrap gap-4 text-sm">
              {aqi && (
                <div>
                  <span className="text-muted-foreground">AQI: </span>
                  <span className={cn("font-medium", textColor)}>{aqi}</span>
                </div>
              )}
              {pm25 && (
                <div>
                  <span className="text-muted-foreground">PM2.5: </span>
                  <span className={cn("font-medium", textColor)}>{pm25} µg/m³</span>
                </div>
              )}
              {pm10 && (
                <div>
                  <span className="text-muted-foreground">PM10: </span>
                  <span className={cn("font-medium", textColor)}>{pm10} µg/m³</span>
                </div>
              )}
            </div>
          )}

          {/* Location */}
          {location && (
            <p className="text-xs text-muted-foreground mt-3">
              📍 {location}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PollutionIndicator;
