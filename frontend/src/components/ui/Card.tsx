import { useEffect } from "react";
import { TrashIcon, ShareIcon } from "@heroicons/react/24/outline";

interface Tag {
  _id: string;
  title: string;
}

interface CardProps {
  id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube" | "article";
  tags?: Tag[];
  createdAt: string;
  deleteContent: (id: string) => void;
}

const getYouTubeEmbedUrl = (url: string) => {
  const videoIdMatch = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
  return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : "";
};

export function Card({
  id,
  title,
  link,
  type,
  tags,
  createdAt,
  deleteContent,
}: CardProps) {
  useEffect(() => {
    if (type === "twitter" && window.twttr) {
      window.twttr.widgets.load();
    } else if (type === "twitter") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = () => window.twttr?.widgets?.load();
      document.body.appendChild(script);
      return () => document.body.removeChild(script); // Cleanup
    }
  }, [type, link]);

  const renderIcon = () => {
    switch (type) {
      case "twitter":
        return (
          <svg
            className="w-4 h-4 text-gray-600 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case "youtube":
        return (
          <svg
            className="w-4 h-4 text-gray-600 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
          </svg>
        );
      case "article":
        return (
          <svg
            className="w-4 h-4 text-gray-600 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6 2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v16h12V4H6z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (type) {
      case "youtube":
        return (
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={getYouTubeEmbedUrl(link)}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      case "twitter":
        return (
          <div className="bg-gray-100 rounded-lg overflow-hidden h-48 flex items-center justify-center">
            <blockquote className="twitter-tweet p-2" data-conversation="none">
              <a href={link.replace("x.com", "twitter.com")} />
            </blockquote>
          </div>
        );
      case "article":
        return (
          <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Read Article
            </a>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow w-full max-w-xs">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 min-w-0">
            {renderIcon()}
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="p-1.5 hover:bg-gray-50 rounded-lg"
              aria-label="Share"
            >
              <ShareIcon className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => deleteContent(id)}
              className="p-1.5 hover:bg-gray-50 rounded-lg"
              aria-label="Delete"
            >
              <TrashIcon className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mb-3">{renderContent()}</div>

        {/* Tags */}
        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.map((tag) => (
              <span
                key={tag._id}
                className="px-2 py-0.5 text-xs text-indigo-600 bg-indigo-50 rounded-full"
              >
                #{tag.title}
              </span>
            ))}
          </div>
        )}

        {/* Date */}
        <p className="text-xs text-gray-500">
          Added on {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
