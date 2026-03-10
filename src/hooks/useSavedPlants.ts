import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface SavedPlant {
  id: string;
  plant_name: string;
  scientific_name: string | null;
  image_url: string | null;
  air_quality_benefit: string | null;
  sunlight: string | null;
  watering: string | null;
  pollution_resistance: string | null;
  tags: string[] | null;
  created_at: string;
}

interface PlantData {
  name: string;
  scientificName?: string;
  image?: string;
  airQualityBenefit?: string;
  sunlight?: string;
  watering?: string;
  pollutionResistance?: string;
  tags?: string[];
}

export function useSavedPlants() {
  const { user } = useAuth();
  const [savedPlants, setSavedPlants] = useState<SavedPlant[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedPlants = async () => {
    if (!user) {
      setSavedPlants([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("saved_plants")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSavedPlants(data || []);
    } catch (err) {
      console.error("Error fetching saved plants:", err);
    } finally {
      setLoading(false);
    }
  };

  const savePlant = async (plant: PlantData) => {
    if (!user) {
      toast.error("Please log in to save plants");
      return false;
    }

    try {
      const { error } = await supabase.from("saved_plants").insert({
        user_id: user.id,
        plant_name: plant.name,
        scientific_name: plant.scientificName,
        image_url: plant.image,
        air_quality_benefit: plant.airQualityBenefit,
        sunlight: plant.sunlight,
        watering: plant.watering,
        pollution_resistance: plant.pollutionResistance,
        tags: plant.tags,
      });

      if (error) {
        if (error.code === "23505") {
          toast.info("Plant already saved!");
          return false;
        }
        throw error;
      }

      await fetchSavedPlants();
      toast.success(`${plant.name} saved to your collection! 🌱`);
      return true;
    } catch (err) {
      console.error("Error saving plant:", err);
      toast.error("Failed to save plant");
      return false;
    }
  };

  const removePlant = async (plantName: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from("saved_plants")
        .delete()
        .eq("user_id", user.id)
        .eq("plant_name", plantName);

      if (error) throw error;

      await fetchSavedPlants();
      toast.success("Plant removed from collection");
      return true;
    } catch (err) {
      console.error("Error removing plant:", err);
      toast.error("Failed to remove plant");
      return false;
    }
  };

  const isPlantSaved = (plantName: string) => {
    return savedPlants.some((p) => p.plant_name === plantName);
  };

  useEffect(() => {
    fetchSavedPlants();
  }, [user]);

  return {
    savedPlants,
    loading,
    savePlant,
    removePlant,
    isPlantSaved,
    refetch: fetchSavedPlants,
  };
}
