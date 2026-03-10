import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";

interface SearchHistoryItem {
  id: string;
  search_type: string;
  search_query: string | null;
  location: string | null;
  air_quality_index: number | null;
  created_at: string;
}

interface FormattedSearchItem {
  id: string;
  name: string;
  type: string;
  date: string;
  aqi?: number;
}

export function useSearchHistory() {
  const { user } = useAuth();
  const [history, setHistory] = useState<FormattedSearchItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    if (!user) {
      setHistory([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("search_history")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;

      const formatted = (data || []).map((item: SearchHistoryItem) => ({
        id: item.id,
        name: item.search_query || item.location || "Unknown",
        type: item.search_type,
        date: formatDistanceToNow(new Date(item.created_at), { addSuffix: true }),
        aqi: item.air_quality_index || undefined,
      }));

      setHistory(formatted);
    } catch (err) {
      console.error("Error fetching search history:", err);
    } finally {
      setLoading(false);
    }
  };

  const addSearch = async (params: {
    type: string;
    query?: string;
    location?: string;
    aqi?: number;
  }) => {
    if (!user) return false;

    try {
      const { error } = await supabase.from("search_history").insert({
        user_id: user.id,
        search_type: params.type,
        search_query: params.query,
        location: params.location,
        air_quality_index: params.aqi,
      });

      if (error) throw error;

      await fetchHistory();
      return true;
    } catch (err) {
      console.error("Error adding search:", err);
      return false;
    }
  };

  const clearHistory = async () => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from("search_history")
        .delete()
        .eq("user_id", user.id);

      if (error) throw error;

      setHistory([]);
      return true;
    } catch (err) {
      console.error("Error clearing history:", err);
      return false;
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [user]);

  return {
    history,
    loading,
    addSearch,
    clearHistory,
    refetch: fetchHistory,
  };
}
