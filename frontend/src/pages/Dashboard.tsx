import { useMemo, useState } from "react";
import { Button } from "../components/ui/Button";
import PlusIcon from "../icons/Plusicon";
import CreateModalContent from "../components/CreateContentModal";
import useContent from "../hooks/useContent";
import { Sidebar } from "../components/Sidebar";
import { Card } from "../components/ui/Card";
import { ShareBrainModal } from "../components/ShareBrianModal";
import { Loader } from "../components/ui/Loader";
import useLogout from "../hooks/useLogout";
import { useRecoilValue } from "recoil";
import { authState } from "../state/atom";
import { Navbar } from "../components/Navbar";

const Dashboard = () => {
    const { isAuthenticated } = useRecoilValue(authState);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState("all");
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
        () => window.matchMedia("(max-width: 768px)").matches,
    );
    const { content, loading, error, refreshContent, deleteContent } =
        useContent();
    const logout = useLogout();

    console.log(
        "Dashboard activeFilter:",
        activeFilter,
        "isSidebarCollapsed:",
        isSidebarCollapsed,
    );

    const filteredContent = useMemo(() => {
        if (activeFilter === "all") return content;
        return content.filter((item) => item.type === activeFilter);
    }, [content, activeFilter]);

    const handleContentAdded = () => {
        setIsModalOpen(false);
        refreshContent();
    };

    const EmptyState = () => (
        <div className="mt-32 text-center">
            <p className="text-lg text-gray-500">
                {activeFilter === "all"
                    ? "No notes yet. Start by adding some content!"
                    : `No ${activeFilter} content found. Try adding some!`}
            </p>
            <Button
                className="mt-4"
                icon={<PlusIcon />}
                onClick={() => setIsModalOpen(true)}
            >
                Add Content
            </Button>
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-gray-200 dark:bg-gray-800">
            <Navbar
                activeFilter={activeFilter}
                onAddContent={() => setIsModalOpen(true)}
                onShare={() => setIsShareModalOpen(true)}
                onLogout={logout}
                isAuthenticated={isAuthenticated}
                isSidebarCollapsed={isSidebarCollapsed}
            />
            <div className="flex flex-1 overflow-hidden pt-[4.5rem]">
                <Sidebar
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    isCollapsed={isSidebarCollapsed}
                    setIsCollapsed={setIsSidebarCollapsed}
                />
                <main
                    className={`flex-1 overflow-y-auto p-6 pb-6 ${isSidebarCollapsed ? "ml-16" : "ml-48"
                        } transition-all duration-300 bg-gray-200 dark:bg-gray-800`}
                >
                    <div className="min-h-[calc(100vh-4.5rem)] p-6">
                        {loading && (
                            <div className="flex justify-center items-center h-64">
                                <Loader className="w-8 h-8 text-indigo-600" />
                            </div>
                        )}
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                                {error}
                            </div>
                        )}
                        {!loading && !error && filteredContent.length === 0 && (
                            <div className="flex items-center justify-center">
                                <EmptyState />
                            </div>
                        )}
                        {!loading && !error && filteredContent.length > 0 && (
                            <div
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-items-center
                            text-center text-gray-900 dark:text-gray-200"
                            >
                                {filteredContent.map((item) => (
                                    <Card
                                        key={item._id}
                                        id={item._id}
                                        type={item.type}
                                        title={item.title}
                                        link={item.link}
                                        tags={item.tags}
                                        createdAt={item.createdAt}
                                        deleteContent={deleteContent}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>
            <CreateModalContent
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleContentAdded}
            />
            <ShareBrainModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                itemCount={filteredContent.length}
            />
        </div>
    );
};

export default Dashboard;
