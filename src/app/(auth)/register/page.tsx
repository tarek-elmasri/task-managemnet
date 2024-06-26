import RegisterForm from "./register-form";

export default async function RegisterPage() {
  return (
    <div className="">
      <main className="mx-auto w-full max-w-sm rounded-md border p-7 shadow">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <p className="mt-2 text-balance text-sm text-muted-foreground">
          Enter your details below to sign up an account
        </p>

        <RegisterForm />
      </main>
    </div>
  );
}
