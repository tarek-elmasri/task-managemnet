import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "title is required!"),
  description: z.string().min(1, "description is required!"),
});

export type TaskSchema = z.infer<typeof taskSchema>;

export const taskQuerySchema = z.object({
  completed: z.boolean().optional(),
});

export type TaskQuerySchema = z.infer<typeof taskQuerySchema>;
