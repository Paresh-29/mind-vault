export const SidebarItems = ({ text, icon, collapsed, isActive = false, onClick }) => {
    return (<button onClick={onClick} className={`
        w-full flex items-center gap-3 p-2 rounded-lg
        transition-colors duration-200
        ${isActive
            ? 'bg-indigo-50 text-indigo-600'
            : 'text-gray-700 hover:bg-gray-100'}
      `}>
      <div className={`
        ${isActive ? 'text-indigo-600' : 'text-gray-600'}
      `}>
        {icon}
      </div>
      {!collapsed && <span className="truncate">{text}</span>}
    </button>);
};
