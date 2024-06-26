"use client";

import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { TRPCClientError } from "@trpc/client";

const useDeleteTask = () => {
  const utils = api.useUtils();
  const { toast } = useToast();

  const mutation = api.tasks.delete.useMutation({
    onMutate: async (data) => {
      await utils.tasks.findAll.cancel();
      const prevData = utils.tasks.findAll.getData();
      const updatedTasks =
        prevData?.filter((task) => task.id !== data.id) ?? [];

      utils.tasks.findAll.setData(undefined, () => updatedTasks);
      return { prevData };
    },
    onError: (error, _, ctx) => {
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
      toast({ description: "Task deleted successfully!" });
    },
    onSettled: async (data) => {
      await utils.tasks.findAll.invalidate();
      await utils.tasks.findById.invalidate({ id: data?.id });
    },
  });

  return mutation;
};

export default useDeleteTask;
