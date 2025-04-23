import { useMemo, useState } from "react";
import { Button } from "../components/ui/Button";
import PlusIcon from "../icons/Plusicon";
import CreateModalContent from "../components/CreateContentModal";
import useContent from "../hooks/useContent";
import { Sidebar } from "../components/Sidebar";
import { Card } from "../components/ui/Card";
import { ShareBrainModal } from "../components/ShareBrianModal";
import useLogout from "../hooks/useLogout";
import { useRecoilValue } from "recoil";
import { authState } from "../state/atom";
import { Navbar } from "../components/Navbar";
import { GridSkeleton } from "../components/ui/Skeleton";
import SkeletonNavbar from "../components/ui/SkeletonNavbar";
import SkeletonSidebar from "../components/ui/SkeletonSidebar";

interface ContentItem {
  _id: string;
  type: "twitter" | "youtube" | "article";
  title: string;
  link: string;
  tags?: { _id: string; title: string }[];
  createdAt: string;
}

const Dashboard = () => {
  const { isAuthenticated } = useRecoilValue(authState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "twitter" | "youtube" | "article"
  >("all");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    () => window.matchMedia("(max-width: 768px)").matches,
  );
  const { content, loading, error, refreshContent, deleteContent } =
    useContent();
  console.log("content", content);
  const logout = useLogout();

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

  const getSkeleton = () => {
    const width = window.innerWidth;
    if (width >= 1536) return 25;
    if (width >= 1280) return 20;
    if (width >= 1024) return 15;
    if (width >= 640) return 10;
    return 5;
  };

  return (
    <div className="flex flex-col h-full bg-gray-200 dark:bg-gray-800">
      {loading ? (
        <SkeletonNavbar />
      ) : (
        <Navbar
          activeFilter={activeFilter}
          onAddContent={() => setIsModalOpen(true)}
          onShare={() => setIsShareModalOpen(true)}
          onLogout={logout}
          isAuthenticated={isAuthenticated}
          isSidebarCollapsed={isSidebarCollapsed}
        />
      )}
      <div className="flex flex-1 overflow-hidden pt-[4.5rem]">
        {loading ? (
          <SkeletonSidebar />
        ) : (
          <Sidebar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            isCollapsed={isSidebarCollapsed}
            setIsCollapsed={setIsSidebarCollapsed}
          />
        )}
        <main
          className={`flex-1 overflow-y-auto p-6 pb-6 ${isSidebarCollapsed ? "ml-16" : "ml-48"
            } transition-all duration-300 bg-gray-200 dark:bg-gray-800`}
        >
          <div className="min-h-[calc(100vh-4.5rem)] p-6">
            {loading && content.length === 0 ? (
              <GridSkeleton count={getSkeleton()} />
            ) : error ? (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                {error}
              </div>
            ) : filteredContent.length === 0 ? (
              <div className="flex items-center justify-center">
                <EmptyState />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-items-center text-center text-gray-900 dark:text-gray-200">
                {filteredContent.map((item: any) => {
                  const cardProps = {
                    id: item._id,
                    type: ["twitter", "youtube", "article"].includes(item.type)
                      ? (item.type as "twitter" | "youtube" | "article")
                      : "article",
                    title: item.title,
                    link: item.link,
                    tags: item.tags?.map((t: any) => ({
                      _id: t._id || Math.random().toString(),
                      title: t.title || "Untagged",
                    })),
                    createdAt: item.createdAt || new Date().toISOString(),
                  };

                  return (
                    <Card
                      key={item._id}
                      {...cardProps}
                      deleteContent={deleteContent}
                    />
                  );
                })}
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
