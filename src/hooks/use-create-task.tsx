"use client";

import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";

const useCreateTask = () => {
  const { toast } = useToast();
  const utils = api.useUtils();
  const mutation = api.tasks.create.useMutation({
    onMutate: async (data) => {
      await utils.tasks.findAll.cancel();
      const prevData = utils.tasks.findAll.getData();
      const newTask = {
        ...data,
        id: "temporary",
        completed: false,
        userId: "temporary",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      utils.tasks.findAll.setData(undefined, (prev) =>
        prev ? [...prev, newTask] : [newTask],
      );
      return { prevData };
    },
    onError: (_err, _data, ctx) => {
      toast({
        variant: "destructive",
        description: "An error has occured. please try again!",
      });
      utils.tasks.findAll.setData(undefined, ctx?.prevData);
    },
    onSuccess: () => {
      toast({ description: "Task created successfully!" });
    },
    onSettled: () => {
      utils.tasks.findAll.invalidate();
    },
  });

  return mutation;
};

export default useCreateTask;
