import { ErrorNotFound } from "@/lib/errors";
import type { TaskQuerySchema, TaskSchema } from "@/lib/validations/task";
import type { PrismaClient } from "@prisma/client";

export const createTask = async (
  db: PrismaClient,
  userId: string,
  data: TaskSchema,
) => {
  return db.task.create({
    data: {
      ...data,
      userId,
      completed: false,
    },
  });
};

export const deleteTask = async (
  db: PrismaClient,
  id: string,
  userId: string,
) => {
  return db.task.delete({ where: { id, userId } });
};

export const findById = async (
  db: PrismaClient,
  id: string,
  userId: string,
) => {
  return db.task.findFirst({ where: { id, userId } });
};

export const findAll = async (
  db: PrismaClient,
  userId: string,
  filter: TaskQuerySchema = {},
) => {
  // if completed is undefined, prisma will exclude it from query
  const { completed } = filter;
  return db.task.findMany({
    where: {
      userId,
      completed,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

export const update = async (
  db: PrismaClient,
  id: string,
  userId: string,
  data: TaskSchema,
) => {
  return db.task.update({
    where: {
      id,
      userId,
    },
    data,
  });
};

export const toggleCompleted = async (
  db: PrismaClient,
  id: string,
  userId: string,
  status: boolean,
) => {
  return db.task.update({
    where: { id, userId },
    data: { completed: status },
  });
};
