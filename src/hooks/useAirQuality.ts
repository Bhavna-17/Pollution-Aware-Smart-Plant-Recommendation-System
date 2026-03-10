import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AirQualityData {
  aqi: number;
  pm25: number;
  pm10: number;
  level: "low" | "medium" | "high";
  description: string;
  components?: {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
}

interface LocationData {
  lat: number;
  lon: number;
  name: string;
}

export const useAirQuality = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);

  const fetchLocationName = async (lat: number, lon: number): Promise<string> => {
    try {
      // Use free reverse geocoding from BigDataCloud
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );
      
      if (response.ok) {
        const data = await response.json();
        const city = data.city || data.locality || data.principalSubdivision || "Unknown";
        const country = data.countryName || "";
        return city + (country ? `, ${country}` : "");
      }
    } catch (e) {
      console.warn("Reverse geocoding failed:", e);
    }
    return "Unknown Location";
  };

  const fetchAirQuality = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch location name and air quality in parallel
      const [locationName, airQualityResponse] = await Promise.all([
        fetchLocationName(lat, lon),
        supabase.functions.invoke("get-air-quality", {
          body: { lat, lon },
        }),
      ]);

      if (airQualityResponse.error) {
        throw new Error(airQualityResponse.error.message);
      }

      const data = airQualityResponse.data as AirQualityData;
      
      setLocation({ lat, lon, name: locationName });
      setAirQuality(data);
      
      return { location: { lat, lon, name: locationName }, airQuality: data };
    } catch (err: any) {
      const errorMessage = err.message || "Failed to fetch air quality data";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const detectAndFetch = useCallback(async () => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation is not supported by your browser");
      return null;
    }

    return new Promise<{ location: LocationData; airQuality: AirQualityData } | null>(
      (resolve) => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const result = await fetchAirQuality(
                position.coords.latitude,
                position.coords.longitude
              );
              resolve(result);
            } catch {
              resolve(null);
            }
          },
          (err) => {
            setError("Location access denied. Please enable location services.");
            setLoading(false);
            resolve(null);
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
        );
      }
    );
  }, [fetchAirQuality]);

  return {
    loading,
    error,
    airQuality,
    location,
    fetchAirQuality,
    detectAndFetch,
  };
};
