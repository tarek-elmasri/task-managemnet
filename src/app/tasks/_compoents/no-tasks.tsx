"use client";

import CalenderSVG from "@/components/CalenderSvg";
import { Button } from "@/components/ui/button";

const NoTasks = () => {
  return (
    <div className="w-full rounded-md border">
      <div className="p-12">
        <div className="flex flex-col items-center justify-center gap-4">
          <CalenderSVG className="aspect-square w-28" />
          <h2 className="text-balance text-center text-2xl font-bold">
            You have no tasks!
          </h2>
          <p className="text-balance text-center text-muted-foreground">
            you can start creating your first task
          </p>
          <Button>Add Task</Button>
        </div>
      </div>
    </div>
  );
};

export default NoTasks;
