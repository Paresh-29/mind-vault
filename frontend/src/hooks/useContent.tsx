import { useEffect, useState } from "react";
import { apiWithAuth } from "../utils/axios";
import { Content } from "../types/content";
import { AxiosError } from "axios";

// interface Content {
//     _id: string;
//     title: string;
//     link: string;
//     type: "twitter" | "youtube" | "article";
//     tags?: string[];
// }

export function useContent() {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch content
  const fetchContent = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        return;
      }

      const response = await apiWithAuth.get("/content", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContent(response.data.contents || []);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "Failed to fetch content");
      } else {
        setError("An unknown error occurred");
      }
      setContent([]);
    } finally {
      setLoading(false);
    }
  };

  // Delete content
  const deleteContent = async (contentId: string) => {
    if (!contentId) {
      console.error("Error: contentId is undefined");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await apiWithAuth.delete(`/content/${contentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setContent((prev) => prev.filter((item) => item._id !== contentId));
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.error("Delete Error:", err.response?.data || err.message);
      } else {
        console.error(
          "An unknown error occurred while deleting content: ",
          err
        );
      }
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return {
    content,
    loading,
    error,
    refreshContent: fetchContent,
    deleteContent,
  };
}

export default useContent;
