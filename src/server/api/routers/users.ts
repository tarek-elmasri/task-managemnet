import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { newUserSchema } from "@/lib/validations/user";
import { createUser } from "@/server/services/user";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(newUserSchema)
    .mutation(async ({ input, ctx: { db } }) => {
      const user = await createUser(db, input);
      return user;
    }),
});
