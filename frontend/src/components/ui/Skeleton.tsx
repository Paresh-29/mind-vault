import { cn } from "../../utils/cn";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200 dark:bg-gray-700",
        className,
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="w-full max-w-xs rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="p-4 space-y-3">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="w-4 h-4 rounded-md" />
            <Skeleton className="w-4 h-4 rounded-md" />
          </div>
        </div>

        {/* Preview Block */}
        <div className="relative h-48 rounded-lg bg-gray-100 dark:bg-gray-900" />

        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>

        {/* Date */}
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
