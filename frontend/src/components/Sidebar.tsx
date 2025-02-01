import { useEffect } from "react";
import { SidebarItems } from "./SidebarItems";
import { Logo } from "./ui/Logo";
import { TwitterIcon } from "./ui/Twitter";
import { YoutubeIcon } from "./ui/Youtube";
import { FileText, Hash, LinkIcon, ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
  activeFilter,
  onFilterChange
}: SidebarProps) => {
  // Handle auto-collapse on mobile screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsCollapsed]);

  const navigationItems = [
    {
      id: 'all',
      text: 'All Content',
      icon: <Hash className="w-5 h-5" />
    },
    {
      id: 'twitter',
      text: 'Tweets',
      icon: <TwitterIcon className="w-5 h-5" />
    },
    {
      id: 'youtube',
      text: 'Videos',
      icon: <YoutubeIcon className="w-5 h-5" />
    },
    {
      id: 'document',
      text: 'Documents',
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 'link',
      text: 'Links',
      icon: <LinkIcon className="w-5 h-5" />
    }
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-100 transition-all duration-300 z-20 ${isCollapsed ? "w-16" : "w-64"
        }`}
    >
      <div className="flex h-full flex-col p-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-3 h-14">
          <Logo className="w-7 h-7 text-indigo-600 flex-shrink-0" />
          {!isCollapsed && (
            <span className="text-xl font-semibold text-gray-900 truncate">
              Second Brain
            </span>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="mt-8 space-y-1">
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

        {/* Toggle Button */}
        <div className="flex justify-center mt-auto pb-4">
          <button
            className="bg-white border border-gray-100 rounded-full p-2 shadow-sm hover:bg-gray-50 transition-colors"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};
