import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import PlusIcon from "../icons/Plusicon";
import Shareicon from "../icons/Shareicon";
import CreateModalContent from "../components/CreateContentModal";
import useContent from "../hooks/useContent";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { content, loading, error, refreshContent } = useContent();

  const handleContentAdded = () => {
    setIsModalOpen(false);
    refreshContent();
  };

  console.log("Dashboard Content:", content); // Debugging

  return (
    <div className="p-4">
      <div className="flex justify-end gap-4">
        <Button icon={<PlusIcon />} onClick={() => setIsModalOpen(true)}>
          Add Content
        </Button>
        <Button variant="secondary" icon={<Shareicon />}>
          Share brain
        </Button>
      </div>

      {loading && (
        <div className="flex justify-center items-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="mt-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
          {error}
        </div>
      )}

      {!loading && !error && content.length > 0 && (
        <div className="flex gap-4 flex-wrap">
          {content?.map((item) => (
            <Card
              key={item._id}
              type={item.type}
              title={item.title}
              link={item.link}
            // tags={item.tags}
            />
          ))}
        </div>
      )}

      <CreateModalContent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleContentAdded}
      />
    </div>
  );
};

export default Dashboard;
