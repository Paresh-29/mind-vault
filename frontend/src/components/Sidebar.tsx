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
  Sparkles,
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
      icon: <TwitterIcon className="w-5 h-5 text-blue-400" />,
    },
    {
      id: "youtube",
      text: "Videos",
      icon: <YoutubeIcon className="w-5 h-5 text-red-500" />,
    },
    {
      id: "article",
      text: "Articles",
      icon: <FileText className="w-5 h-5 text-emerald-400" />,
    },
    {
      id: "link",
      text: "Links",
      icon: <LinkIcon className="w-5 h-5 text-purple-400" />,
    },
  ];

  return (
    <aside
      className={`fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 transition-all duration-300 z-10 shadow-md ${
        isCollapsed ? "w-16" : "w-52"
      }`}
    >
      <div className="flex h-full flex-col p-4">
        <div className="flex items-center gap-2 h-14 pb-2 border-b dark:border-gray-700">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center gap-2 group transition-all"
          >
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-1 rounded-lg shadow-lg transition-transform group-hover:scale-110 duration-300">
              <Logo className="w-7 h-7 flex-shrink-0 text-white" />
            </div>
            {!isCollapsed && (
              <span className="text-xl font-bold text-gray-900 dark:text-gray-50 truncate flex items-center gap-1">
                Second Brain
                <Sparkles className="w-4 h-4 text-amber-400" />
              </span>
            )}
          </button>
        </div>

        <nav className="mt-6 flex-1 space-y-2">
          <div className="pl-2 pb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {!isCollapsed && "Navigation"}
          </div>
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
          className={`mt-auto mx-auto flex items-center justify-center
            bg-gradient-to-r from-indigo-500 to-purple-600
            text-white rounded-full p-2 shadow-lg
            hover:shadow-indigo-500/20 hover:scale-105
            transition-all duration-300 ${
              isCollapsed ? "w-10 h-10" : "w-full"
            }`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-white" />
          ) : (
            <div className="flex items-center">
              <ChevronLeft className="w-5 h-5 text-white" />
              <span className="ml-1 text-sm font-medium">Collapse</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};
