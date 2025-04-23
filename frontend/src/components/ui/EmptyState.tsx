import PlusIcon from "../../icons/Plusicon";
import { Button } from "./Button";

interface EmptyStateProps {
  activeFilter: string;
  onAddContent: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  activeFilter,
  onAddContent,
}) => {
  return (
    <div className="mt-32 text-center">
      <p className="text-lg text-gray-500">
        {activeFilter === "all"
          ? "no notes yet. Start by adding some content!"
          : `no ${activeFilter} content found. Try adding some!`}
      </p>
      <Button className="mt-4" icon={<PlusIcon />} onClick={onAddContent}>
        Add Content
      </Button>
    </div>
  );
};

export default EmptyState;
