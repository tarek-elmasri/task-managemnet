import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { taskQuerySchema, taskSchema } from "@/lib/validations/task";
import {
  createTask,
  deleteTask,
  findAll,
  findById,
  update,
} from "@/server/services/task";
import { idSchema } from "@/lib/validations/shared";
import { ErrorNotFound } from "@/lib/errors";

export const taskRouter = createTRPCRouter({
  create: protectedProcedure.input(taskSchema).mutation(
    async ({
      input,
      ctx: {
        db,
        session: { user },
      },
    }) => {
      return createTask(db, user.id, input);
    },
  ),

  delete: protectedProcedure.input(idSchema).mutation(
    async ({
      input,
      ctx: {
        db,
        session: { user },
      },
    }) => {
      const task = await findById(db, input.id, user.id);
      if (!task) throw new ErrorNotFound();
      return deleteTask(db, input.id, user.id);
    },
  ),

  findAll: protectedProcedure.input(taskQuerySchema.optional()).query(
    async ({
      input,
      ctx: {
        db,
        session: { user },
      },
    }) => {
      return findAll(db, user.id, input);
    },
  ),

  findById: protectedProcedure.input(idSchema).query(
    async ({
      input,
      ctx: {
        db,
        session: { user },
      },
    }) => {
      return findById(db, input.id, user.id);
    },
  ),

  update: protectedProcedure.input(taskSchema.merge(idSchema)).mutation(
    async ({
      input,
      ctx: {
        db,
        session: { user },
      },
    }) => {
      const { id, ...data } = input;
      const task = await findById(db, id, user.id);
      if (!task) throw new ErrorNotFound();
      return update(db, id, user.id, data);
    },
  ),
});
