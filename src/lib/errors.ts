import { TRPCError } from "@trpc/server";

export class ErrorEmailAlreadyExists extends TRPCError {
  constructor() {
    super({
      message: "email already exists",
      code: "CONFLICT",
    });
  }
}

export class ErrorNotFound extends TRPCError {
  constructor() {
    super({
      message: "record not found",
      code: "NOT_FOUND",
    });
  }
}
