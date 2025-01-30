import { useEffect, useState } from "react";
import api from "../utils/axios";

interface Content {
  _id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube";
  tags?: string[];
}

export function useContent() {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/content", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("api response", response.data);

      setContent(response.data.contents || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return { content, loading, error, refreshContent: fetchContent };
}

export default useContent;
