"use client";

import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { TRPCClientError } from "@trpc/client";

const useUpdateTask = () => {
  const { toast } = useToast();
  const utils = api.useUtils();
  const mutation = api.tasks.update.useMutation({
    onMutate: async (data) => {
      await utils.tasks.findAll.cancel();
      const prevData = utils.tasks.findAll.getData();
      const updatedTasks =
        prevData?.map((task) =>
          task.id === data.id ? { ...task, ...data } : task,
        ) ?? [];

      utils.tasks.findAll.setData(undefined, () => updatedTasks);
      return { prevData };
    },
    onError: (error, _data, ctx) => {
      if (
        error instanceof TRPCClientError &&
        (error.data as { code: string }).code === "NOT_FOUND"
      ) {
        toast({
          description: "This task is no longer available!",
          variant: "destructive",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Server Error",
          description: "An error has occured. please try again!",
        });
      }
      utils.tasks.findAll.setData(undefined, ctx?.prevData);
    },
    onSuccess: () => {
      toast({ description: "Task updated successfully!" });
    },
    onSettled: (task) => {
      utils.tasks.findAll.invalidate();
      utils.tasks.findById.invalidate({ id: task?.id });
    },
  });

  return mutation;
};

export default useUpdateTask;
