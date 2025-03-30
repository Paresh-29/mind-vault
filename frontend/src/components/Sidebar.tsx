import { useEffect } from "react";
import { SidebarItems } from "./SidebarItems";
import { Logo } from "./ui/Logo";
import { TwitterIcon } from "./ui/Twitter";
import { YoutubeIcon } from "./ui/Youtube";
import {
  FileText,
  Hash,
  LinkIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export const Sidebar = ({
  activeFilter,
  onFilterChange,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) => {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleMediaChange = () => setIsCollapsed(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, [setIsCollapsed]);

  const navigationItems = [
    { id: "all", text: "All Content", icon: <Hash className="w-5 h-5" /> },
    {
      id: "twitter",
      text: "Tweets",
      icon: <TwitterIcon className="w-5 h-5" />,
    },
    {
      id: "youtube",
      text: "Videos",
      icon: <YoutubeIcon className="w-5 h-5" />,
    },
    { id: "article", text: "Articles", icon: <FileText className="w-5 h-5" /> },
    { id: "link", text: "Links", icon: <LinkIcon className="w-5 h-5" /> },
  ];

  return (
    <aside
      className={`fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-white border-r border-gray-100 transition-all duration-300 z-10 ${
        isCollapsed ? "w-16" : "w-48"
      }`}
    >
      <div className="flex h-full flex-col p-4">
        <div className="flex items-center gap-2 h-14">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center gap-2"
          >
            <Logo className="w-8 h-8 flex-shrink-0" />
            {!isCollapsed && (
              <span className="text-xl font-semibold text-gray-900 truncate">
                Second Brain
              </span>
            )}
          </button>
        </div>
        <nav className="mt-8 flex-1 space-y-1">
          {navigationItems.map((item) => (
            <SidebarItems
              key={item.id}
              text={item.text}
              icon={item.icon}
              collapsed={isCollapsed}
              isActive={activeFilter === item.id}
              onClick={() => onFilterChange(item.id)}
            />
          ))}
        </nav>
        <button
          className="mt-auto bg-white border border-gray-100 rounded-full p-2 shadow-sm hover:bg-gray-50 transition-colors"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
    </aside>
  );
};
