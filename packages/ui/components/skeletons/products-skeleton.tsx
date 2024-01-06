import React from "react";
// utils
import { cn } from "../../lib/utils";
// components
import { ScrollArea, ScrollBar } from "../../components/scroll-area";
import { Skeleton } from "../../components/skeleton";

// ----------------------------------------------------------------------

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
}

export function ProductListSkeleton({ count = 4, className }: SkeletonProps) {
  return (
    <div className="relative">
      <ScrollArea>
        <div className={cn("flex space-x-4 pb-4", className)}>
          {[...Array(count)].map((_, index) => (
            <Skeleton key={index} className="w-[246px] h-[338px] rounded-xl" />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
