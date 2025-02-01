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
  type: "twitter" | "youtube";
  tags?: Tag[];
  createdAt: string;
  deleteContent: (id: string) => void;
}

const getYouTubeEmbedUrl = (url: string) => {
  const videoId = url.split("v=")[1];
  return `https://www.youtube.com/embed/${videoId}`;
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
    if (type === "twitter") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = () => {
        window.twttr?.widgets?.load(); // Force re-render
      };
      document.body.appendChild(script);
    }
  }, [type, link]);
  return (
    <div
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow w-full max-w-[280px]">
      {/* Card Header */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 min-w-0">
            {type === "twitter" ? (
              <svg className="w-4 h-4 text-gray-600 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-gray-600 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            )}
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-1 rounded-lg hover:bg-gray-50 transition-colors">
              <ShareIcon className="w-3.5 h-3.5 text-gray-600" />
            </button>
            <button onClick={() => deleteContent(id)}
              className="p-1 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <TrashIcon className="w-3.5 h-3.5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Embedded Content */}
        <div className="w-full">
          {type === "youtube" && (
            <div className="w-full relative aspect-video bg-gray-100 rounded-lg mb-2 overflow-hidden">
              <iframe className="absolute top-0 left-0 w-full h-full"
                src={getYouTubeEmbedUrl(link)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen />
            </div>
          )}

          {type === "twitter" && (
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-2 h-[180px] flex items-center justify-center">
              <blockquote className="twitter-tweet p-2" data-conversation="none">
                <a href={link.replace("x.com", "twitter.com")}></a>
              </blockquote>
            </div>
          )}
        </div>

        {/* Tags */}
        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-1.5">
            {tags.map((tag) => (
              <span key={tag._id} className="px-1.5 py-0.5 text-xs text-indigo-600 bg-indigo-50 rounded">
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
