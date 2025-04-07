import { useMemo, useState } from "react";
import { Button } from "../components/ui/Button";
import PlusIcon from "../icons/Plusicon";
import Shareicon from "../icons/Shareicon";
import CreateModalContent from "../components/CreateContentModal";
import useContent from "../hooks/useContent";
import { Sidebar } from "../components/Sidebar";
import { Card } from "../components/ui/Card";
import { ShareBrainModal } from "../components/ShareBrianModal";
import { Loader } from "../components/ui/Loader";
import useLogout from "../hooks/useLogout";
import { useRecoilValue } from "recoil";
import { authState } from "../state/atom";
import LogoutIcon from "../icons/LogoutIcon";

const Navbar = ({
  activeFilter,
  onAddContent,
  onShare,
  onLogout,
  isAuthenticated,
  isSidebarCollapsed,
}) => {
  console.log(
    "Navbar rendering with activeFilter:",
    activeFilter,
    "isSidebarCollapsed:",
    isSidebarCollapsed
  );
  return (
    <header className="bg-white border-b border-gray-100 p-4 fixed top-0 left-0 right-0 z-20">
      <div
        className={`max-w-[1920px] mx-auto flex items-center gap-4 ${
          isSidebarCollapsed ? "pl-16" : "pl-48"
        } transition-all duration-300`}
      >
        <h1 className="text-2xl font-semibold text-gray-900 min-w-0 truncate">
          {activeFilter === "all"
            ? "All Notes"
            : activeFilter === "twitter"
            ? "Tweets"
            : activeFilter === "youtube"
            ? "Videos"
            : activeFilter === "article"
            ? "Articles"
            : activeFilter === "link"
            ? "Links"
            : "Unknown"}
        </h1>
        <div className="ml-auto flex items-center gap-3">
          <Button
            variant="secondary"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg"
            onClick={onShare}
          >
            <Shareicon className="w-4 h-4" />
            Share Brain
          </Button>
          <Button
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg"
            onClick={onAddContent}
          >
            <PlusIcon className="w-4 h-4" />
            Add Content
          </Button>
          {isAuthenticated && (
            <button
              className="p-2 text-gray-900 hover:text-red-600 transition-colors"
              onClick={onLogout}
              aria-label="Logout"
            >
              <LogoutIcon className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

const Dashboard = () => {
  const { isAuthenticated } = useRecoilValue(authState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    () => window.matchMedia("(max-width: 768px)").matches
  );
  const { content, loading, error, refreshContent, deleteContent } =
    useContent();
  const logout = useLogout();

  console.log(
    "Dashboard activeFilter:",
    activeFilter,
    "isSidebarCollapsed:",
    isSidebarCollapsed
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
    <div className="flex flex-col h-full">
      <Navbar
        activeFilter={activeFilter}
        onAddContent={() => setIsModalOpen(true)}
        onShare={() => setIsShareModalOpen(true)}
        onLogout={logout}
        isAuthenticated={isAuthenticated}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      <div className="flex flex-1 overflow-hidden pt-14">
        <Sidebar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
        <main
          className={`flex-1 overflow-y-auto p-6 ${
            isSidebarCollapsed ? "ml-16" : "ml-48"
          } transition-all duration-300`}
        >
          {loading && (
            <div className="flex justify-center items-center h-64">
              <Loader className="w-8 h-8 text-indigo-600" />
            </div>
          )}
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
          )}
          {!loading && !error && filteredContent.length === 0 && <EmptyState />}
          {!loading && !error && filteredContent.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 justify-items-center">
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
