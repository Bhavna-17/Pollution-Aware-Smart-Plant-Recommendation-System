import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AirQualityRequest {
  lat: number;
  lon: number;
}

interface AirQualityResponse {
  aqi: number;
  pm25: number;
  pm10: number;
  level: "low" | "medium" | "high";
  description: string;
  components: {
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

// Convert OpenWeatherMap AQI (1-5 scale) to our levels
function getAqiLevel(aqi: number): "low" | "medium" | "high" {
  if (aqi <= 2) return "low";
  if (aqi <= 3) return "medium";
  return "high";
}

function getAqiDescription(aqi: number): string {
  switch (aqi) {
    case 1: return "Good - Air quality is satisfactory";
    case 2: return "Fair - Acceptable air quality";
    case 3: return "Moderate - May cause discomfort for sensitive groups";
    case 4: return "Poor - Health effects possible for everyone";
    case 5: return "Very Poor - Health warnings, emergency conditions";
    default: return "Unknown";
  }
}

// Convert OWM AQI (1-5) to a more standard 0-500 scale for display
function convertToStandardAqi(owmAqi: number, pm25: number): number {
  // Use PM2.5 based calculation for more accurate AQI
  if (pm25 <= 12) return Math.round(pm25 * 4.17);
  if (pm25 <= 35.4) return Math.round(50 + (pm25 - 12) * 2.1);
  if (pm25 <= 55.4) return Math.round(100 + (pm25 - 35.4) * 2.5);
  if (pm25 <= 150.4) return Math.round(150 + (pm25 - 55.4) * 0.52);
  if (pm25 <= 250.4) return Math.round(200 + (pm25 - 150.4) * 1);
  return Math.round(300 + (pm25 - 250.4) * 0.99);
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lat, lon }: AirQualityRequest = await req.json();

    if (!lat || !lon) {
      return new Response(
        JSON.stringify({ error: "Latitude and longitude are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // OpenWeatherMap Air Pollution API (free tier available)
    const apiKey = Deno.env.get("OPENWEATHERMAP_API_KEY") || "demo";
    
    // Use Open-Meteo as a free alternative if no API key
    let airQualityData: AirQualityResponse;
    
    if (apiKey === "demo") {
      // Use Open-Meteo Air Quality API (completely free, no key needed)
      const openMeteoUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,european_aqi`;
      
      const response = await fetch(openMeteoUrl);
      
      if (!response.ok) {
        throw new Error(`Open-Meteo API error: ${response.status}`);
      }
      
      const data = await response.json();
      const current = data.current;
      
      const europeanAqi = current.european_aqi || 50;
      const pm25 = current.pm2_5 || 0;
      const pm10 = current.pm10 || 0;
      
      // Convert European AQI to level
      let level: "low" | "medium" | "high";
      let description: string;
      
      if (europeanAqi <= 40) {
        level = "low";
        description = "Good - Air quality is satisfactory";
      } else if (europeanAqi <= 80) {
        level = "medium";
        description = "Moderate - Acceptable for most people";
      } else {
        level = "high";
        description = "Poor - May cause health issues";
      }
      
      airQualityData = {
        aqi: europeanAqi,
        pm25: Math.round(pm25 * 10) / 10,
        pm10: Math.round(pm10 * 10) / 10,
        level,
        description,
        components: {
          co: current.carbon_monoxide || 0,
          no: 0,
          no2: current.nitrogen_dioxide || 0,
          o3: current.ozone || 0,
          so2: current.sulphur_dioxide || 0,
          pm2_5: pm25,
          pm10: pm10,
          nh3: 0,
        },
      };
    } else {
      // Use OpenWeatherMap API
      const owmUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      
      const response = await fetch(owmUrl);
      
      if (!response.ok) {
        throw new Error(`OpenWeatherMap API error: ${response.status}`);
      }
      
      const data = await response.json();
      const pollution = data.list[0];
      const owmAqi = pollution.main.aqi;
      const components = pollution.components;
      
      airQualityData = {
        aqi: convertToStandardAqi(owmAqi, components.pm2_5),
        pm25: Math.round(components.pm2_5 * 10) / 10,
        pm10: Math.round(components.pm10 * 10) / 10,
        level: getAqiLevel(owmAqi),
        description: getAqiDescription(owmAqi),
        components: {
          co: components.co,
          no: components.no,
          no2: components.no2,
          o3: components.o3,
          so2: components.so2,
          pm2_5: components.pm2_5,
          pm10: components.pm10,
          nh3: components.nh3,
        },
      };
    }

    console.log("Air quality data fetched successfully:", airQualityData);

    return new Response(JSON.stringify(airQualityData), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error fetching air quality:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to fetch air quality data" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
