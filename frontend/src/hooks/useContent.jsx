import { useEffect, useState } from "react";
import { apiWithAuth } from "../utils/axios";
export function useContent() {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Fetch content
    const fetchContent = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await apiWithAuth.get("/content", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setContent(response.data.contents || []);
            setError(null);
        }
        catch (err) {
            setError(err.response?.data?.message || "Failed to fetch content");
        }
        finally {
            setLoading(false);
        }
    };
    // Delete content
    const deleteContent = async (contentId) => {
        if (!contentId) {
            console.error("Error: contentId is undefined");
            return;
        }
        try {
            const token = localStorage.getItem("token");
            const res = await apiWithAuth.delete(`/content/${contentId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log("Delete Response:", res.data);
            if (res.status === 200) {
                setContent((prev) => prev.filter((item) => item._id !== contentId));
            }
        }
        catch (err) {
            console.error("Delete Error:", err.response?.data || err.message);
        }
    };
    useEffect(() => {
        fetchContent();
    }, []);
    return { content, loading, error, refreshContent: fetchContent, deleteContent };
}
export default useContent;
