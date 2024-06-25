import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email("invalid email format!"),
  password: z.string().min(5, "password must be at least of 5 characters."),
});

export type AuthSchema = z.infer<typeof authSchema>;

export const newUserSchema = z.object({
  name: z.string().min(1, "name is required!"),
  email: z.string().email("invalid email format"),
  password: z.string().min(5, "password must be at least of 5 characters"),
});

export type NewUserSchema = z.infer<typeof newUserSchema>;
