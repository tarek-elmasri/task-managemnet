import { Separator } from "@/components/ui/separator";
import LoginForm from "./login-form";

export default async function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 md:px-6 lg:px-8">
      <main className="mx-auto w-full max-w-sm  rounded-lg border border-primary/50 p-8 shadow shadow-primary/50">
        <h1 className="text-center text-lg font-bold">Task Management</h1>
        <Separator className="my-6" />
        <LoginForm />
      </main>
    </div>
  );
}
