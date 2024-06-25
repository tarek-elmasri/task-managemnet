import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { newUserSchema } from "@/lib/validations/user";
import { ErrorEmailAlreadyExists, createUser } from "@/server/services/user";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(newUserSchema)
    .query(async ({ input, ctx: { db } }) => {
      try {
        return createUser(db, input);
      } catch (error) {
        if (error instanceof ErrorEmailAlreadyExists) {
          return new TRPCError({
            message: "email already exists",
            code: "UNPROCESSABLE_CONTENT",
          });
        }
        return new TRPCError({
          message: "internal server error",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
