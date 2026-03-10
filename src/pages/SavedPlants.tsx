import { Heart, Leaf, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingPlants from "@/components/background/FloatingPlants";
import { useSavedPlants } from "@/hooks/useSavedPlants";
import { Link } from "react-router-dom";

const SavedPlants = () => {
  const { savedPlants, loading, removePlant } = useSavedPlants();

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingPlants />
      <Navbar />

      <main className="container mx-auto px-4 pt-28 pb-16 relative z-10">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5 text-sage fill-sage" />
            <span className="text-sage font-medium text-sm">Your Collection</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            My Saved Plants
          </h1>
          <p className="text-muted-foreground">
            Plants you've saved for future reference
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-sage/10 flex items-center justify-center animate-pulse">
              <Leaf className="w-8 h-8 text-sage" />
            </div>
            <p className="text-muted-foreground">Loading your saved plants...</p>
          </div>
        ) : savedPlants.length === 0 ? (
          <Card variant="nature" className="animate-fade-in-up">
            <CardContent className="py-16 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-sage/10 flex items-center justify-center">
                <Heart className="w-10 h-10 text-sage" />
              </div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                No saved plants yet
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Start exploring our recommendations and save the plants you love to build your personal collection.
              </p>
              <Button variant="eco" asChild>
                <Link to="/recommendations">
                  <Leaf className="w-4 h-4 mr-2" />
                  Browse Recommendations
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedPlants.map((plant, index) => (
              <Card
                key={plant.id}
                variant="elevated"
                className="group overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={plant.image_url || "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=300&fit=crop"}
                    alt={plant.plant_name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white text-destructive rounded-full shadow-lg"
                    onClick={() => removePlant(plant.plant_name)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-display text-lg font-semibold text-white mb-1">
                      {plant.plant_name}
                    </h3>
                    {plant.scientific_name && (
                      <p className="text-white/80 text-sm italic">
                        {plant.scientific_name}
                      </p>
                    )}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {plant.air_quality_benefit && (
                      <Badge variant="secondary" className="bg-sage/10 text-sage border-sage/20">
                        Air: {plant.air_quality_benefit}
                      </Badge>
                    )}
                    {plant.sunlight && (
                      <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                        {plant.sunlight}
                      </Badge>
                    )}
                    {plant.watering && (
                      <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                        Water: {plant.watering}
                      </Badge>
                    )}
                  </div>
                  {plant.tags && plant.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {plant.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SavedPlants;
