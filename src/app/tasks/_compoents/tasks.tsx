"use client";

import { api } from "@/trpc/react";
import NoTasks from "./no-tasks";
import { useMemo, useState } from "react";
import CreateOrEditTaskModal from "@/components/modals/create-edit-task-modal";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterSelect, { type FilterKeys } from "./filter-select";

const Tasks = () => {
  const [openModal, setOpenModal] = useState(false);
  const [filterQuery, setFilterQuery] = useState<FilterKeys>("all");

  const { data: tasks, isLoading, isError } = api.tasks.findAll.useQuery();

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];
    if (filterQuery === "all") return tasks;
    return tasks.filter((task) =>
      filterQuery === "completed" ? task.completed : !task.completed,
    );
  }, [tasks, filterQuery]);

  if (isLoading) return <p>Loading ...</p>;
  if (isError) return <p>Failed to connect to server. please try again!</p>;
  if (!tasks?.length) return <NoTasks />;

  return (
    <div className="space-y-6">
      {openModal && (
        <CreateOrEditTaskModal onClose={() => setOpenModal(false)} />
      )}

      {/* controls */}
      <div className="flex items-center justify-between gap-4">
        <Button
          size={"sm"}
          className="gap-2"
          onClick={() => setOpenModal(true)}
        >
          <PlusCircle className="h-5 w-5" />
          <span>Add Task</span>
        </Button>
        <FilterSelect value={filterQuery} onChange={setFilterQuery} />
      </div>

      {/* tasks table */}
      <DataTable columns={columns} data={filteredTasks} />
    </div>
  );
};

export default Tasks;
