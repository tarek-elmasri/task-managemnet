"use client";

import { Button } from "@/components/ui/button";
import type { Task } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CalendarCheck, ShieldAlert } from "lucide-react";
import CellActions from "./actions";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <p className="whitespace-pre-wrap">{row.original.description}</p>
    ),
  },
  {
    accessorKey: "createdAt",
    cell: ({ row }) => <>{row.original.createdAt.toDateString()}</>,
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          <span>Created At</span>
          <Button
            variant="ghost"
            size={"icon"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "completed",
    header: "Status",

    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.completed ? (
          <CalendarCheck className="aspect-square w-5 text-green-600" />
        ) : (
          <ShieldAlert className="aspect-square w-5 text-yellow-400" />
        )}
        <span
          className={cn(
            "text-yellow-400",
            row.original.completed && "text-green-600",
          )}
        >
          {row.original.completed ? "Completed" : "Pending"}
        </span>
      </div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <CellActions task={row.original} />,
  },
];
