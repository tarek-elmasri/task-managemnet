"use client";

import CreateOrEditTaskModal from "@/components/modals/create-edit-task-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import useToggleCompleted from "@/hooks/use-toggle-completed";
import { api } from "@/trpc/react";
import type { Task } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import { Fragment, useState } from "react";

const CellActions = ({ task }: { task: Task }) => {
  const utils = api.useUtils();
  const { toast } = useToast();

  const [openModal, setOpenModal] = useState(false);
  const { mutateAsync: deleteTask, isPending: isDeleting } =
    api.tasks.delete.useMutation({
      onSuccess: () => {
        utils.tasks.findAll.invalidate();
      },
    });

  const { mutate: toggleCompleted, isPending: isTogglingCompleted } =
    useToggleCompleted();

  const handleDelete = async () => {
    try {
      await deleteTask({ id: task.id });
      toast({ description: "Task deleted successfully!" });
    } catch (error) {
      toast({
        variant: "destructive",
        description:
          "An error has occured while deleting task. please try again!",
      });
    }
  };

  return (
    <Fragment>
      {openModal && (
        <CreateOrEditTaskModal
          task={task}
          onClose={() => setOpenModal(false)}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={isTogglingCompleted}
            onClick={() => toggleCompleted({ id: task.id })}
          >
            {task.completed ? "Mark Pending" : "Mark Completed"}
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setOpenModal(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem disabled={isDeleting} onClick={handleDelete}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Fragment>
  );
};

export default CellActions;
