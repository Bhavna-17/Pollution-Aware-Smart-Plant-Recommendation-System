import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Camera, Leaf, Users, Bell, Sun } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Auto Location Detection",
    description: "We detect your location automatically to fetch real-time air quality data for personalized recommendations.",
    color: "text-sage",
    bgColor: "bg-sage/10",
  },
  {
    icon: Camera,
    title: "Space Analysis",
    description: "Upload an image of your space and we'll understand if it's indoor, outdoor, roadside, or balcony.",
    color: "text-mint",
    bgColor: "bg-mint/20",
  },
  {
    icon: Leaf,
    title: "Smart Recommendations",
    description: "Get plants that survive in your specific environment and actively improve air quality.",
    color: "text-sage",
    bgColor: "bg-sage-light/20",
  },
  {
    icon: Sun,
    title: "Sunlight Matching",
    description: "We match plants to your available sunlight — full sun, partial shade, or indoor low-light.",
    color: "text-sunlight",
    bgColor: "bg-sunlight-soft/30",
  },
  {
    icon: Users,
    title: "Community Wisdom",
    description: "Learn from other planters in your area. Share tips and discover what works locally.",
    color: "text-earth-light",
    bgColor: "bg-beige-warm/40",
  },
  {
    icon: Bell,
    title: "Gentle Reminders",
    description: "Friendly notifications for watering, fertilizing, and seasonal care tips.",
    color: "text-mint",
    bgColor: "bg-mint-light/30",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sage font-semibold text-sm uppercase tracking-wider mb-4">
            How It Works
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need to
            <span className="text-sage"> Grow Smart</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From pollution detection to personalized care, we've got your green journey covered.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              variant="interactive"
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
