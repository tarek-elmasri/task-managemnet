"use client";

import { api } from "@/trpc/react";
import NoTasks from "./no-tasks";

const Tasks = () => {
  const { data: tasks, isLoading } = api.tasks.findAll.useQuery();
  if (isLoading) return <p>Loading ...</p>;
  if (!tasks) return <p>Failed to connect to server. please try again!</p>;
  if (!tasks.length) return <NoTasks />;
  return <div>Tasks</div>;
};

export default Tasks;
