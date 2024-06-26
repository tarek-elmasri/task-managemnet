"use client";

import { Skeleton } from "@/components/ui/skeleton";

const TableLoader = () => {
  return (
    <div className="w-full rounded-md border p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-8 w-28" />
        </div>
        <Skeleton className="w-w-full h-8" />
        <Skeleton className="w-w-full h-8" />
        <Skeleton className="w-w-full h-8" />
        <Skeleton className="w-w-full h-8" />
        <Skeleton className="w-w-full h-8" />
      </div>
    </div>
  );
};

export default TableLoader;
