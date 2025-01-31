import { useState } from "react";
import { SidebarItems } from "./SidebarItems";
import { Logo } from "./ui/Logo";
import { TwitterIcon } from "./ui/Twitter";
import { YoutubeIcon } from "./ui/Youtube";
import { FileText, Hash, LinkIcon } from "lucide-react";

export const Sidebar = () => {
const [isCollapsed, setIsCollapsed] = useState(false);

return (
<aside className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-100 transition-all duration-300 z-20
	${isCollapsed ? "w-16" : "w-64" }`}>
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

		{/* Toggle Button */}
		<button className="absolute -right-3 top-6 bg-white border border-gray-100 
          rounded-full p-1.5 shadow-sm hover:bg-gray-50 transition-colors" onClick={()=> setIsCollapsed(!isCollapsed)}
			>
			<svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ isCollapsed
					? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7M19 19l-7-7 7-7" } />
			</svg>
		</button>

		{/* Navigation Items */}
		<nav className="mt-8 space-y-1">
			<SidebarItems text="Tweets" icon={<TwitterIcon className="w-5 h-5 text-gray-600" />}
			collapsed={isCollapsed}
			/>
			<SidebarItems text="Videos" icon={<YoutubeIcon className="w-5 h-5 text-gray-600" />}
			collapsed={isCollapsed}
			/>
			<SidebarItems text="Documents" icon={<FileText className="w-5 h-5 text-gray-600" />}
			collapsed={isCollapsed}
			/>
			<SidebarItems text="Links" icon={<LinkIcon className="w-5 h-5 text-gray-600" />}
			collapsed={isCollapsed}
			/>
			<SidebarItems text="Tags" icon={<Hash className="w-5 h-5 text-gray-600" />}
			collapsed={isCollapsed}
			/>
		</nav>
	</div>
</aside>
);
};
