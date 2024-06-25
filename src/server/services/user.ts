import { env } from "@/env";
import { ErrorEmailAlreadyExists } from "@/lib/errors";
import { AuthSchema, NewUserSchema } from "@/lib/validations/user";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";

export const authenticate = async (
  db: PrismaClient,
  credentials: AuthSchema,
): Promise<User | null> => {
  const user = await db.user.findUnique({
    where: {
      email: credentials.email.toLowerCase(),
    },
  });

  if (!user || !user.password) return null;

  const isAuthenticated = await bcrypt.compare(
    credentials.password + env.NEXTAUTH_SECRET,
    user.password,
  );

  if (!isAuthenticated) return null;

  return user;
};

/**
 * throws Error if email already exists or db failure
 * @param db PrismaClient
 * @param userData NewUserSchema
 */
export const createUser = async (db: PrismaClient, userData: NewUserSchema) => {
  const { name, email, password } = userData;
  const emailExists = await db.user.findUnique({
    where: { email: email.toLowerCase() },
  });
  if (emailExists) throw new ErrorEmailAlreadyExists();

  const hashedPassword = await bcrypt.hash(password + env.NEXTAUTH_SECRET, 12);
  return db.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};
