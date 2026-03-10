import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, RefreshCw, Leaf, Camera, ArrowRight, History, AlertCircle, Trash2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingPlants from "@/components/background/FloatingPlants";
import PollutionIndicator from "@/components/pollution/PollutionIndicator";
import ImageUploader from "@/components/upload/ImageUploader";
import { useAirQuality } from "@/hooks/useAirQuality";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const { loading, error, airQuality, location, detectAndFetch } = useAirQuality();
  const { history, loading: historyLoading, addSearch, clearHistory } = useSearchHistory();

  const handleRefresh = async () => {
    const result = await detectAndFetch();
    if (result) {
      toast.success("Location detected! 📍", {
        description: `Real-time air quality data for ${result.location.name}`,
      });
      // Save to search history
      await addSearch({
        type: "location",
        location: result.location.name,
        aqi: result.airQuality.aqi,
      });
    } else if (error) {
      toast.error("Could not fetch data", {
        description: error,
      });
    }
  };

  const handleImageUpload = (file: File, preview: string) => {
    setUploadedImage(preview);
    toast.success("Image uploaded! 📸", {
      description: "We'll analyze your space for best plant matches.",
    });
  };

  useEffect(() => {
    // Auto-detect location and fetch air quality on mount
    handleRefresh();
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingPlants />
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16 relative z-10">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Your Dashboard
          </h1>
          <p className="text-muted-foreground">
            Let's find the perfect plants for your environment
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Location & Pollution Section */}
            <Card variant="elevated" className="animate-fade-in-up">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-sage" />
                    Your Location
                  </CardTitle>
                  <Button
                    variant="soft"
                    size="sm"
                    onClick={handleRefresh}
                    disabled={loading}
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loading && !location ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-sage/10 flex items-center justify-center animate-pulse">
                      <MapPin className="w-8 h-8 text-sage" />
                    </div>
                    <p className="text-muted-foreground">
                      Detecting your location and fetching air quality...
                    </p>
                  </div>
                ) : error && !location ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-destructive/10 flex items-center justify-center">
                      <AlertCircle className="w-8 h-8 text-destructive" />
                    </div>
                    <p className="text-muted-foreground mb-4">{error}</p>
                    <Button variant="eco" onClick={handleRefresh} disabled={loading}>
                      Try Again
                    </Button>
                  </div>
                ) : location && airQuality ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-foreground font-medium">
                        📍 {location.name}
                      </p>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        Live data
                      </span>
                    </div>
                    <PollutionIndicator
                      level={airQuality.level}
                      aqi={airQuality.aqi}
                      pm25={airQuality.pm25}
                      pm10={airQuality.pm10}
                      location={location.name}
                    />
                    {airQuality.description && (
                      <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                        {airQuality.description}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-sage/10 flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-sage" />
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Enable location to get personalized recommendations
                    </p>
                    <Button variant="eco" onClick={handleRefresh} disabled={loading}>
                      {loading ? "Detecting..." : "Enable Location"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Image Upload Section */}
            <Card variant="elevated" className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-sage" />
                  Your Planting Space
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUploader
                  onImageUpload={handleImageUpload}
                  currentImage={uploadedImage || undefined}
                  onClear={() => setUploadedImage(null)}
                />
                
                {uploadedImage && (
                  <div className="mt-4 p-4 rounded-xl bg-mint-light/30 border border-sage/20">
                    <p className="text-sm text-sage font-medium mb-2">Space Analysis:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Detected: <span className="text-foreground">Outdoor Balcony</span></li>
                      <li>• Light: <span className="text-foreground">Partial Sunlight</span></li>
                      <li>• Planting: <span className="text-foreground">Pots recommended</span></li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Get Recommendations CTA */}
            <Button 
              variant="hero" 
              size="xl" 
              className="w-full animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
              asChild
            >
              <Link to="/recommendations">
                <Leaf className="w-5 h-5 mr-2" />
                Get Plant Recommendations
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Recent Searches */}
            <Card variant="nature" className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <History className="w-4 h-4 text-sage" />
                    Recent Searches
                  </CardTitle>
                  {history.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={async () => {
                        await clearHistory();
                        toast.success("History cleared");
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {historyLoading ? (
                  <div className="text-center py-4 text-muted-foreground">Loading...</div>
                ) : history.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground text-sm">
                    No recent searches yet
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {history.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-card/50 hover:bg-card transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          {item.type === "location" ? (
                            <MapPin className="w-4 h-4 text-sage" />
                          ) : (
                            <Leaf className="w-4 h-4 text-sage" />
                          )}
                          <span className="text-foreground text-sm font-medium">{item.name}</span>
                          {item.aqi && (
                            <span className="text-xs bg-sage/10 text-sage px-2 py-0.5 rounded-full">
                              AQI: {item.aqi}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card variant="glass" className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="text-lg">💡 Quick Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-sage">•</span>
                    Plants with thick leaves are better pollution absorbers
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sage">•</span>
                    Group plants together for better humidity
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sage">•</span>
                    Water in the morning for best absorption
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
