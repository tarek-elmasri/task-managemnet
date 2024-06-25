"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const useUser = () => {
  const { data, status } = useSession();

  const user = data?.user;
  const isLoading = status === "loading";

  return {
    user,
    isLoading,
    signOut,
  };
};

export default useUser;
