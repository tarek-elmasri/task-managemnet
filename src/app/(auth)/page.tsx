import LoginForm from "./login-form";

export default async function LoginPage() {
  return (
    <main className="mx-auto w-full max-w-sm  rounded-md border p-7 shadow ">
      <h1 className="text-2xl font-bold">Login</h1>
      <p className="mt-2 text-balance text-sm text-muted-foreground">
        Enter your email below to login to your account
      </p>
      <LoginForm />
    </main>
  );
}
