import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, Droplets, Wind, Heart, Leaf, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlantCardProps {
  name: string;
  scientificName: string;
  image: string;
  airQualityBenefit: "High" | "Medium" | "Low";
  sunlight: "Full Sun" | "Partial" | "Low Light";
  watering: "High" | "Medium" | "Low";
  pollutionResistance: "Excellent" | "Good" | "Moderate";
  tags: string[];
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
}

const PlantCard = ({
  name,
  scientificName,
  image,
  airQualityBenefit,
  sunlight,
  watering,
  pollutionResistance,
  tags,
  isFavorite = false,
  onFavoriteToggle,
}: PlantCardProps) => {
  const benefitColors = {
    High: "bg-sage/20 text-sage border-sage/30",
    Medium: "bg-sunlight-soft/50 text-earth border-sunlight/30",
    Low: "bg-mint-light/50 text-earth-light border-mint/30",
  };

  const resistanceColors = {
    Excellent: "text-sage",
    Good: "text-mint",
    Moderate: "text-earth-light",
  };

  return (
    <Card variant="interactive" className="group overflow-hidden relative">
      {/* Bloom effect overlay - appears on hover */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {/* Floating leaves that appear on hover */}
        <Leaf className="absolute top-4 left-4 w-4 h-4 text-sage/40 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 group-hover:animate-sway" />
        <Leaf className="absolute top-8 right-6 w-3 h-3 text-mint/50 rotate-45 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200 group-hover:animate-float-slow" />
        <Leaf className="absolute bottom-20 left-6 w-3.5 h-3.5 text-sage-light/40 -rotate-12 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-300 group-hover:animate-wiggle" />
        
        {/* Sparkles that bloom */}
        <Sparkles className="absolute top-6 right-12 w-3 h-3 text-sunlight/60 scale-0 group-hover:scale-100 transition-transform duration-300 delay-150" />
        <Sparkles className="absolute top-12 left-10 w-2.5 h-2.5 text-sunlight-soft/70 scale-0 group-hover:scale-100 transition-transform duration-300 delay-250" />
        <Sparkles className="absolute bottom-24 right-8 w-2 h-2 text-sunlight/50 scale-0 group-hover:scale-100 transition-transform duration-300 delay-350" />
      </div>

      {/* Image with grow effect */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Gradient overlay that softens on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/30 transition-all duration-500" />
        
        {/* Growing vine border effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-sage/20 rounded-t-xl transition-colors duration-500" />
        
        {/* Favorite button with bloom */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle?.();
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-eco hover:scale-125 hover:bg-white active:scale-95 transition-all duration-300"
        >
          <Heart
            className={cn(
              "w-5 h-5 transition-all duration-300",
              isFavorite 
                ? "text-destructive fill-destructive scale-110" 
                : "text-muted-foreground group-hover:text-destructive/70"
            )}
          />
        </button>

        {/* Air quality badge with subtle grow */}
        <div className="absolute bottom-3 left-3 transform group-hover:scale-105 transition-transform duration-300">
          <Badge className={cn("font-medium", benefitColors[airQualityBenefit])}>
            <Wind className="w-3 h-3 mr-1 group-hover:animate-wiggle" />
            {airQualityBenefit} Air Purifier
          </Badge>
        </div>
      </div>

      <CardContent className="p-5 relative">
        {/* Subtle leaf icon that grows on hover */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-500 delay-200">
          <Leaf className="w-6 h-6 text-sage/20 animate-sway" />
        </div>

        {/* Name with color bloom */}
        <h3 className="font-display text-xl font-semibold text-foreground mb-1 group-hover:text-sage transition-colors duration-300 transform group-hover:translate-x-1">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground italic mb-4 group-hover:text-sage-light transition-colors duration-300">
          {scientificName}
        </p>

        {/* Info row with icon animations */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
            <Sun className="w-4 h-4 text-sunlight group-hover:animate-pulse-soft group-hover:scale-110 transition-transform duration-300" />
            <span>{sunlight}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
            <Droplets className="w-4 h-4 text-blue-400 group-hover:animate-bounce-soft transition-transform duration-300" />
            <span>{watering}</span>
          </div>
        </div>

        {/* Pollution resistance with grow animation */}
        <p className="text-sm mb-4 transform group-hover:translate-x-1 transition-transform duration-300">
          <span className="text-muted-foreground">Pollution Resistance: </span>
          <span className={cn("font-medium transition-all duration-300 group-hover:font-semibold", resistanceColors[pollutionResistance])}>
            {pollutionResistance}
          </span>
        </p>

        {/* Tags with staggered bloom */}
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="text-xs font-normal transform group-hover:scale-105 group-hover:bg-sage/10 group-hover:text-sage transition-all duration-300"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlantCard;
