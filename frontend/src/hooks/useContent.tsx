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

		// Fetch content
		const fetchContent = async () => {
		try {
		const token = localStorage.getItem("token");
		const response = await api.get("/content", {
		headers: { Authorization: `Bearer ${token}` },
		});
		setContent(response.data.contents || []);
		setError(null);
		} catch (err) {
		setError(err.response?.data?.message || "Failed to fetch content");
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
		const res = await api.delete(`/content/${contentId}`, {
		headers: {
		"Authorization": `Bearer ${token}`,
		"Content-Type": "application/json",
		},
		});
		console.log("Delete Response:", res.data);
		if (res.status === 200) {
		setContent((prev) => prev.filter((item) => item._id !== contentId));
		}
		} catch (err) {
		console.error("Delete Error:", err.response?.data || err.message);
		}
		};

		useEffect(() => {
		fetchContent();
		}, []);

		return { content, loading, error, refreshContent: fetchContent, deleteContent };
		}

		export default useContent;
