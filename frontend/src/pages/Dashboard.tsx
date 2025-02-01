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

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const { content, loading, error, refreshContent, deleteContent } = useContent();

  // Filter content based on active filter
  const filteredContent = useMemo(() => {
    if (activeFilter === 'all') return content;
    return content.filter(item => item.type === activeFilter);
  }, [content, activeFilter]);

  const handleContentAdded = () => {
    setIsModalOpen(false);
    refreshContent();
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    // Auto collapse on mobile
    if (window.innerWidth < 768) {
      setIsSidebarCollapsed(true);
    }
  };

  const EmptyState = () => (
    <div className="mt-32 text-center">
      <p className="text-gray-500 text-lg">
        {activeFilter === 'all'
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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />

      <main
        className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? "ml-16" : "ml-64"
          }`}
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              {activeFilter === 'all'
                ? "All Notes"
                : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}s`}
            </h1>
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg"
                onClick={() => setIsShareModalOpen(true)}
              >
                <Shareicon className="w-4 h-4" />
                Share Brain
              </Button>
              <Button
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg"
                onClick={() => setIsModalOpen(true)}
              >
                <PlusIcon className="w-4 h-4" />
                Add Content
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="min-h-[calc(100vh-140px)]">
            {loading && (
              <div className="flex flex-col justify-center items-center h-64">
                <Loader className="w-8 h-8 text-indigo-600" />
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                {error}
              </div>
            )}

            {!loading && !error && filteredContent.length === 0 && <EmptyState />}

            {!loading && !error && filteredContent.length > 0 && (
              <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-items-center">
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
              </div>
            )}
          </div>
        </div>

        <CreateModalContent
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleContentAdded}
        />

        {/* Share Brain Modal */}
        <ShareBrainModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          itemCount={filteredContent.length}
        />
      </main>
    </div>
  );
};

export default Dashboard;
