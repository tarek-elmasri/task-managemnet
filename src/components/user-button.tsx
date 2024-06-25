"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useUser from "@/hooks/use-user";
import { Power } from "lucide-react";

const UserButton = () => {
  const { user, signOut, isLoading } = useUser();
  if (isLoading) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full  ring-offset-4 ring-offset-secondary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary hover:ring-2 hover:ring-primary">
        <Avatar>
          <AvatarFallback className="bg-primary font-semibold">
            {user?.name?.charAt(0).toUpperCase() ??
              user?.email?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="text-muted-foreground">
          <p>{user?.name}</p>
          <p>{user?.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex items-center gap-3"
          onClick={() => signOut()}
        >
          <Power className="h-4 w-4 text-red-500" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
