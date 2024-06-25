"use client";

import { newUserSchema } from "@/lib/validations/user";
import type { AuthSchema, NewUserSchema } from "@/lib/validations/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Spinner from "@/components/ui/spinner";
import { api } from "@/trpc/react";
import { TRPCClientError } from "@trpc/client";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { useState } from "react";

const RegisterForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: register, isPending } = api.users.create.useMutation();

  const form = useForm<NewUserSchema>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    shouldFocusError: true,
  });

  const onSubmit = async (userForm: NewUserSchema) => {
    try {
      await register(userForm);
      await signInAfterRegisetration({
        email: userForm.email,
        password: userForm.password,
      });
    } catch (error) {
      if (
        error instanceof TRPCClientError &&
        (error.data as { code: string }).code === "CONFLICT"
      ) {
        form.setError("email", { message: "Email already exists" });
      } else {
        toast({
          title: "Server Error",
          description: "Failed to create account. please try again!",
        });
      }
    }
  };

  const signInAfterRegisetration = async (credentials: AuthSchema) => {
    setIsLoading(true);
    signIn("credentials", { ...credentials, redirect: false })
      .then((callback) => {
        if (callback?.error) {
          router.push("/");
        }

        if (!callback?.error && callback?.ok) {
          router.push("/tasks");
        }
      })
      .catch(() => {
        router.push("/");
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel>Name:</FormLabel>
              <FormControl>
                <Input required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel>Email:</FormLabel>
              <FormControl>
                <Input required type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel>Password:</FormLabel>
              <FormControl>
                <Input required type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="mt-6 w-full"
          disabled={isPending || isLoading}
        >
          {isPending ? <Spinner className="h-3 w-3" /> : "Register"}
        </Button>
        <p className="mt-1 text-xs">
          Already have account?{" "}
          <Link className="font-semibold hover:underline" href={"/"}>
            Login.
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default RegisterForm;
