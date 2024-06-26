"use client";

import CalenderSVG from "@/components/CalenderSvg";
import CreateOrEditTaskModal from "@/components/modals/create-edit-task-modal";
import { Button } from "@/components/ui/button";
import { Fragment, useState } from "react";

const NoTasks = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Fragment>
      {openModal && (
        <CreateOrEditTaskModal onClose={() => setOpenModal(false)} />
      )}

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
            <Button onClick={() => setOpenModal(true)}>Add Task</Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NoTasks;
