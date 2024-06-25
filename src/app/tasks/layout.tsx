import Navbar from "@/components/navbar";
import type { ReactNode } from "react";

const TasksLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <header className="border-b p-4">
        <Navbar />
      </header>
      <main className="p-8">{children}</main>
    </div>
  );
};

export default TasksLayout;
