interface SidebarItemsProps {
text: string;
icon: React.ReactNode;
active?: boolean;
collapsed?: boolean;
}

export const SidebarItems = ({
text,
icon,
active,
collapsed,
}: SidebarItemsProps) => {
return (
<button className={` w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${active
	? "text-gray-900 bg-gray-100 font-medium" : "text-gray-600 hover:bg-gray-50" } `}>
	<span className="flex-shrink-0">{icon}</span>
	{!collapsed && <span className="ml-3">{text}</span>}
</button>
);
};
