import { MapPin, Upload, Sparkles, Leaf } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    step: "01",
    title: "Share Your Location",
    description: "Allow location access so we can fetch real-time air quality and pollution data for your area.",
  },
  {
    icon: Upload,
    step: "02",
    title: "Upload Your Space",
    description: "Take a photo of where you want to plant. We'll analyze sunlight, space type, and environment.",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Get Smart Picks",
    description: "Receive personalized plant recommendations that thrive in your conditions and clean your air.",
  },
  {
    icon: Leaf,
    step: "04",
    title: "Grow & Thrive",
    description: "Follow our care tips, get reminders, and watch your green space flourish!",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 md:py-32 eco-gradient">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sage font-semibold text-sm uppercase tracking-wider mb-4">
            Simple Process
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Four Steps to Your
            <span className="text-sage"> Perfect Garden</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Getting the right plants has never been easier. Just follow these simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative text-center group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-sage/30 to-transparent" />
                )}

                {/* Icon */}
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-card shadow-eco-card mb-6 group-hover:shadow-eco-glow group-hover:-translate-y-2 transition-all duration-300">
                  <step.icon className="w-9 h-9 text-sage" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-sage to-mint text-primary-foreground text-sm font-bold flex items-center justify-center shadow-eco">
                    {step.step}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
