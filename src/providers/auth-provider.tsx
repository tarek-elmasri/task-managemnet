"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: Session | null;
}) => <SessionProvider session={session}>{children}</SessionProvider>;

export default AuthProvider;
