import { useState, useMemo, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Leaf, Filter, Sparkles, AlertTriangle, ThumbsUp, X, Search } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingPlants from "@/components/background/FloatingPlants";
import PlantCard from "@/components/plants/PlantCard";
import { useSavedPlants } from "@/hooks/useSavedPlants";
import { useSearchHistory } from "@/hooks/useSearchHistory";

const recommendedPlants = [
  {
    name: "Snake Plant",
    scientificName: "Sansevieria trifasciata",
    image: "https://images.unsplash.com/photo-1593482892540-60d532f6fada?w=400&h=300&fit=crop",
    airQualityBenefit: "High" as const,
    sunlight: "Low Light" as const,
    watering: "Low" as const,
    pollutionResistance: "Excellent" as const,
    tags: ["Air Purifier", "Beginner Friendly", "Indoor"],
  },
  {
    name: "Peace Lily",
    scientificName: "Spathiphyllum wallisii",
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32e1ce6?w=400&h=300&fit=crop",
    airQualityBenefit: "High" as const,
    sunlight: "Partial" as const,
    watering: "Medium" as const,
    pollutionResistance: "Excellent" as const,
    tags: ["Air Purifier", "Flowering", "Shade Tolerant"],
  },
  {
    name: "Areca Palm",
    scientificName: "Dypsis lutescens",
    image: "https://images.unsplash.com/photo-1572688468-7a0c0d688564?w=400&h=300&fit=crop",
    airQualityBenefit: "High" as const,
    sunlight: "Partial" as const,
    watering: "Medium" as const,
    pollutionResistance: "Good" as const,
    tags: ["Tropical", "Humidifier", "Pet Safe"],
  },
  {
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&h=300&fit=crop",
    airQualityBenefit: "Medium" as const,
    sunlight: "Full Sun" as const,
    watering: "Low" as const,
    pollutionResistance: "Good" as const,
    tags: ["Medicinal", "Succulent", "Easy Care"],
  },
  {
    name: "Spider Plant",
    scientificName: "Chlorophytum comosum",
    image: "https://images.unsplash.com/photo-1572688469156-9c66dc9b3d6b?w=400&h=300&fit=crop",
    airQualityBenefit: "High" as const,
    sunlight: "Partial" as const,
    watering: "Medium" as const,
    pollutionResistance: "Excellent" as const,
    tags: ["Air Purifier", "Fast Growing", "Hanging"],
  },
  {
    name: "Rubber Plant",
    scientificName: "Ficus elastica",
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=400&h=300&fit=crop",
    airQualityBenefit: "Medium" as const,
    sunlight: "Partial" as const,
    watering: "Medium" as const,
    pollutionResistance: "Good" as const,
    tags: ["Statement Plant", "Air Purifier", "Indoor"],
  },
];

const plantsToAvoid = [
  { name: "Fiddle Leaf Fig", reason: "Sensitive to pollution, requires consistent environment" },
  { name: "Maidenhair Fern", reason: "Too delicate for high pollution areas" },
];

const soilRecommendations = [
  { name: "Compost", benefit: "Improves soil structure and adds nutrients" },
  { name: "Vermicompost", benefit: "Rich in beneficial microbes" },
  { name: "Biochar", benefit: "Helps absorb pollutants from soil" },
  { name: "Neem Khali", benefit: "Natural pest deterrent and soil enricher" },
];

const Recommendations = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { isPlantSaved, savePlant, removePlant } = useSavedPlants();
  const { addSearch } = useSearchHistory();

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFavorite = async (plant: typeof recommendedPlants[0]) => {
    if (isPlantSaved(plant.name)) {
      await removePlant(plant.name);
    } else {
      await savePlant({
        name: plant.name,
        scientificName: plant.scientificName,
        image: plant.image,
        airQualityBenefit: plant.airQualityBenefit,
        sunlight: plant.sunlight,
        watering: plant.watering,
        pollutionResistance: plant.pollutionResistance,
        tags: plant.tags,
      });
    }
  };

  // Filter plants based on search and category filter
  const filteredPlants = useMemo(() => {
    return recommendedPlants.filter((plant) => {
      const matchesSearch =
        searchQuery === "" ||
        plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "air-purifier" && plant.tags.includes("Air Purifier")) ||
        (activeFilter === "low-light" && plant.sunlight === "Low Light") ||
        (activeFilter === "beginner" && plant.tags.includes("Beginner Friendly"));

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  // Get autocomplete suggestions
  const suggestions = useMemo(() => {
    if (searchQuery.length < 2) return [];
    const query = searchQuery.toLowerCase();
    return recommendedPlants
      .filter(
        (plant) =>
          plant.name.toLowerCase().includes(query) ||
          plant.scientificName.toLowerCase().includes(query)
      )
      .slice(0, 5);
  }, [searchQuery]);

  const handleSearchSelect = async (plantName: string) => {
    setSearchQuery(plantName);
    setShowSuggestions(false);
    await addSearch({ type: "plant", query: plantName });
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      await addSearch({ type: "plant", query: searchQuery.trim() });
    }
  };

  const filters = ["all", "air-purifier", "low-light", "beginner"];

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingPlants />
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16 relative z-10">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-sage" />
            <span className="text-sage font-medium text-sm">Personalized for you</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Your Plant Recommendations
          </h1>
          <p className="text-muted-foreground">
            Based on moderate pollution and partial sunlight conditions
          </p>
        </div>

        {/* Search */}
        <div ref={searchRef} className="relative mb-6 animate-fade-in-up">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search plants by name, type, or care needs..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="pl-12 pr-4 py-6 text-base bg-card border-border/50 rounded-2xl shadow-eco focus:shadow-eco-glow"
              />
            </div>
          </form>
          
          {/* Autocomplete Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/50 rounded-xl shadow-eco-card overflow-hidden z-20">
              {suggestions.map((plant) => (
                <button
                  key={plant.name}
                  type="button"
                  onClick={() => handleSearchSelect(plant.name)}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-sage/10 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{plant.name}</p>
                    <p className="text-xs text-muted-foreground italic">
                      {plant.scientificName}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8 animate-fade-in-up">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "eco" : "soft"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
            >
              {filter === "all" ? "All Plants" : filter.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase())}
            </Button>
          ))}
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchQuery("")}
              className="text-muted-foreground"
            >
              <X className="w-4 h-4 mr-1" />
              Clear search
            </Button>
          )}
        </div>

        {/* Recommended Plants Grid */}
        <section className="mb-12">
          <h2 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <ThumbsUp className="w-5 h-5 text-sage" />
            {searchQuery ? `Results for "${searchQuery}"` : "Recommended Plants"}
            <span className="text-sm font-normal text-muted-foreground">
              ({filteredPlants.length} plants)
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlants.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-sage/10 flex items-center justify-center">
                <Search className="w-8 h-8 text-sage" />
              </div>
              <p className="text-muted-foreground">No plants found matching your search.</p>
              <Button
                variant="soft"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            filteredPlants.map((plant, index) => (
              <div
                key={plant.name}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PlantCard
                  {...plant}
                  isFavorite={isPlantSaved(plant.name)}
                  onFavoriteToggle={() => toggleFavorite(plant)}
                />
              </div>
            ))
          )}
          </div>
        </section>

        {/* Plants to Avoid */}
        <section className="mb-12">
          <h2 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Plants to Avoid in Your Area
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plantsToAvoid.map((plant, index) => (
              <Card
                key={plant.name}
                variant="default"
                className="border-destructive/20 bg-destructive/5 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <X className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{plant.name}</h3>
                    <p className="text-sm text-muted-foreground">{plant.reason}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Soil Recommendations */}
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-earth-light" />
            Soil & Mix Recommendations
          </h2>
          <Card variant="nature" className="animate-fade-in-up">
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-4">
                For optimal plant growth in your environment, we recommend adding these to your soil:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {soilRecommendations.map((item, index) => (
                  <div
                    key={item.name}
                    className="flex items-start gap-3 p-3 rounded-xl bg-card/50"
                  >
                    <Badge className="bg-sage/10 text-sage border-sage/20 flex-shrink-0">
                      {item.name}
                    </Badge>
                    <p className="text-sm text-muted-foreground">{item.benefit}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Recommendations;
