"use client";

import type { Task } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { type TaskSchema, taskSchema } from "@/lib/validations/task";
import { type IdSchema } from "@/lib/validations/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import useCreateTask from "@/hooks/use-create-task";
import useUpdateTask from "@/hooks/use-update-task";

type CreateOrEditTaskModalProps = {
  task?: Partial<Pick<Task, "id" | "title" | "description">>;

  onClose: () => void;
};

const CreateOrEditTaskModal: FC<CreateOrEditTaskModalProps> = ({
  task = {},
  onClose,
}) => {
  const { mutate: createTask, isPending: isCreating } = useCreateTask();

  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();

  const form = useForm<TaskSchema & Partial<IdSchema>>({
    resolver: zodResolver(
      taskSchema.and(z.object({ id: z.string().optional() })),
    ),
    defaultValues: {
      title: "",
      description: "",
      ...task,
    },
  });

  const onSubmit = (data: TaskSchema & Partial<IdSchema>) => {
    if (data.id) {
      updateTask({ ...data, id: data.id }); // typescript inference issue
    } else {
      createTask(data);
    }

    onClose();
  };

  const isLoading = isCreating || isUpdating;

  return (
    <Dialog modal open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{task?.id ? "Edit Task" : "Add Task"}</DialogTitle>
          <DialogDescription>
            {task?.id
              ? "Make changes to your task here. Click save when you are done!"
              : "Add new task to your list. Click save when you are done!"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title:</FormLabel>
                  <FormControl>
                    <Input required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description:</FormLabel>
                  <FormControl>
                    <Textarea
                      required
                      {...field}
                      rows={5}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end gap-4">
              <Button disabled={isLoading} type="submit" className="w-24">
                Save
              </Button>
              <Button
                type="button"
                variant={"ghost"}
                className="w-24"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrEditTaskModal;
