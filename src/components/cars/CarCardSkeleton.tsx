import { Skeleton } from "@/components/ui/skeleton";

export function CarCardSkeleton() {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-card border border-border">
      {/* Image Skeleton */}
      <Skeleton className="aspect-[4/3] w-full" />

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/3 mb-4" />

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Price */}
        <div className="flex items-end justify-between pt-4 border-t border-border">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </div>
  );
}
