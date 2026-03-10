import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Leaf, ArrowRight, Sparkles, Wind } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen hero-gradient overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-sage/10 rounded-full blur-2xl animate-float" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-mint/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-sunlight-soft/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-sage-light/20 rounded-full blur-xl animate-float-slow" style={{ animationDelay: '2s' }} />
        
        {/* Floating leaves */}
        <Leaf className="absolute top-1/4 left-[15%] w-8 h-8 text-sage/20 animate-sway" style={{ animationDelay: '0.5s' }} />
        <Leaf className="absolute top-1/3 right-[20%] w-6 h-6 text-mint/30 animate-sway" style={{ animationDelay: '1s' }} />
        <Leaf className="absolute bottom-1/3 left-[10%] w-10 h-10 text-sage-light/20 animate-sway" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 md:pt-40 md:pb-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-sage/10 border border-sage/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-sage" />
            <span className="text-sm font-medium text-sage">Pollution-Aware Planting</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-in-up">
            Grow the{" "}
            <span className="relative inline-block">
              <span className="text-sage">Right Plants</span>
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-mint/50"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 6 Q50 0, 100 6 T200 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br />
            for Your Environment
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Smart recommendations based on air quality, sunlight, and your space. 
            Let nature thrive where you are. 🌿
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/dashboard">
                Find My Plants
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="eco-outline" size="lg" asChild>
              <Link to="/community">
                <Wind className="w-5 h-5 mr-2" />
                View Community Tips
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 md:mt-24 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {[
              { value: "500+", label: "Plant Species" },
              { value: "50k+", label: "Happy Planters" },
              { value: "98%", label: "Success Rate" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-sage mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
