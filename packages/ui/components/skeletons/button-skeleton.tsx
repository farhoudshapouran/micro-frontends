import React from "react";
// utils
import { cn } from "../../lib/utils";
//
import { Skeleton } from "../../components/skeleton";

// ----------------------------------------------------------------------

interface SkeletonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export function ButtonSkeleton({ className }: SkeletonProps) {
  return <Skeleton className={cn("h-10 w-full rounded-md", className)} />;
}

export function IconButtonSkeleton({ className }: SkeletonProps) {
  return <Skeleton className={cn("h-9 w-9 rounded-md", className)} />;
}
