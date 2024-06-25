import { env } from "@/env";
import { AuthSchema, NewUserSchema } from "@/lib/validations/user";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";

export class ErrorEmailAlreadyExists extends Error {
  constructor() {
    super("email already exists");
  }
}

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
  const emailExists = await db.user.findUnique({
    where: { email: userData.email.toLowerCase() },
  });
  if (emailExists) throw new ErrorEmailAlreadyExists();

  return db.user.create({
    data: {
      ...userData,
      email: userData.email.toLowerCase(),
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};