import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, TreePine, Flower2 } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-sage/5 via-transparent to-mint/5" />
      
      {/* Floating plants */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Leaf className="absolute top-10 left-[10%] w-12 h-12 text-sage/10 animate-float" />
        <TreePine className="absolute bottom-20 right-[15%] w-16 h-16 text-sage/10 animate-float-slow" />
        <Flower2 className="absolute top-1/2 left-[5%] w-10 h-10 text-mint/15 animate-sway" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-sage/90 to-mint/80 rounded-3xl p-8 md:p-16 text-center shadow-eco-card relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Leaf className="w-4 h-4 text-primary-foreground" />
                <span className="text-sm font-medium text-primary-foreground">Start Growing Today</span>
              </span>

              <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                Ready to Find Your Perfect Plants?
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
                Join thousands of eco-conscious planters making smarter choices for their environment and the planet.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="xl" 
                  className="bg-white text-sage hover:bg-white/90 shadow-eco-card hover:shadow-eco-hover hover:-translate-y-1 transition-all"
                  asChild
                >
                  <Link to="/signup">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="lg"
                  className="text-primary-foreground hover:bg-white/10"
                  asChild
                >
                  <Link to="/community">
                    Explore Community
                  </Link>
                </Button>
              </div>

              <p className="text-primary-foreground/60 text-sm mt-6">
                No credit card required • Free forever for basic use
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
