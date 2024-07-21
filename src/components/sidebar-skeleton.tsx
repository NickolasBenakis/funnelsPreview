import React from "react";
import { Skeleton, SkeletonButton } from "./ui/skeleton";

const SKELETON_BUTTONS = ["skeleton-button-1", "skeleton-button-2"];

const SidebarSkeleton = () => {
  return (
    <div className="p-4" data-testid="sidebar-skeleton">
      <Skeleton className="w-32 h-8 my-4" />
      <SkeletonButton className="w-full" />
      <Skeleton className="w-32 h-8 my-4" />
      <div className="flex flex-col gap-3">
        {SKELETON_BUTTONS.map((skeleton) => {
          return <SkeletonButton key={skeleton} size="sm" className="w-full" />;
        })}
      </div>
    </div>
  );
};

export default SidebarSkeleton;
