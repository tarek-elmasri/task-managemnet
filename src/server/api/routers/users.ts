import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { newUserSchema } from "@/lib/validations/user";
import { ErrorEmailAlreadyExists, createUser } from "@/server/services/user";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(newUserSchema)
    .mutation(async ({ input, ctx: { db } }) => {
      try {
        const user = await createUser(db, input);
        return user;
      } catch (error) {
        // differetiating duplicate email error from other db errors
        if (error instanceof ErrorEmailAlreadyExists) {
          throw new TRPCError({
            message: "email already exists",
            code: "CONFLICT",
          });
        }

        throw new TRPCError({
          message: "internal server error",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
