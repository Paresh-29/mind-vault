import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiWithoutAuth } from "../utils/axios";
import { Loader } from "./ui/Loader";
import { Card } from "./ui/Card";
import { Content } from "../types/content";
import { AxiosError } from "axios";

interface SharedContent {
  content: Content[];
  username: string;
}

export const SharedBrainView: React.FC = () => {
  const [sharedContent, setSharedContent] = useState<SharedContent | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { shareLink } = useParams<{ shareLink: string }>();

  const transformContentItem = (item: any): Content => {
    return {
      _id: item._id || Math.random().toString(36).substring(2, 9),
      type:
        item.type === "twitter" ||
        item.type === "youtube" ||
        item.type === "article"
          ? item.type
          : "article",
      title: item.title || "Untitled",
      link: item.link || "#",
      tags: item.tags
        ? item.tags.map((tag: any) => ({
            _id:
              typeof tag === "string"
                ? tag
                : tag._id || Math.random().toString(36).substring(2, 9),
            title: typeof tag === "string" ? tag : tag.title || "Untagged",
          }))
        : [],
      createdAt: item.createdAt || new Date().toISOString(),
    };
  };

  useEffect(() => {
    const fetchSharedContent = async () => {
      if (!shareLink) {
        setError("No shared link provided");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await apiWithoutAuth.get(`/brain/${shareLink}`);
        console.log("API Response:", response.data);
        const contentArray = Array.isArray(response.data.contents)
          ? response.data.contents.map(transformContentItem)
          : [transformContentItem(response.data.contents)];

        setSharedContent({
          content: contentArray,
          username:
            response.data.contents[0]?.userId?.username || "Shared Brain",
        });
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.error("Axios error:", error);
          setError(
            error.response?.data?.message || "Failed to fetch shared brain"
          );
        } else {
          console.error("Unknown error:", error);
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSharedContent();
  }, [shareLink]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-8 h-8 text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  if (!sharedContent || sharedContent.content.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-600">No shared content found</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-8">
            {sharedContent.username !== "Shared Brain"
              ? `${sharedContent.username}'s Shared Brain`
              : "Shared Brain"}
          </h1>
          <p className="mb-4">Total items: {sharedContent.content.length}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {sharedContent.content.map((item) => (
              <Card
                key={item._id}
                id={item._id}
                type={item.type}
                title={item.title}
                link={item.link}
                tags={item.tags}
                createdAt={item.createdAt}
                deleteContent={() => {}}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
