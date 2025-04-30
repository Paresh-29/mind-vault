const SkeletonSidebar = () => {
    return (
        <aside className="fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 transition-all duration-300 z-10 shadow-md w-52">
            <div className="flex h-full flex-col p-4">
                <div className="flex items-center pt-2.5 sm:pt-5 gap-2 h-14 pb-2 border-b dark:border-gray-700">
                    <div className="bg-gray-300 w-7 h-7 rounded-lg animate-pulse" />
                    <div className="bg-gray-300 w-24 h-6 rounded-lg animate-pulse" />
                </div>
                <nav className="mt-6 flex-1 space-y-2">
                    <div className="pl-2 pb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider animate-pulse">
                        Navigation
                    </div>
                    {/* Placeholder for navigation items */}
                    {[...Array(5)].map((_, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"
                        >
                            <div className="w-5 h-5 bg-gray-400 rounded-full" />
                            <div className="w-24 h-4 bg-gray-400 rounded-lg" />
                        </div>
                    ))}
                </nav>
                <div className="mt-auto flex items-center justify-center p-2 rounded-full bg-gray-300 animate-pulse">
                    <div className="w-5 h-5 bg-gray-400 rounded-full" />
                </div>
            </div>
        </aside>
    );
};

export default SkeletonSidebar;
