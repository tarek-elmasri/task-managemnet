"use client";

import { authSchema } from "@/lib/validations/user";
import type { AuthSchema } from "@/lib/validations/user";
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
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

import Spinner from "@/components/ui/spinner";
const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") ?? "/tasks";

  const form = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    shouldFocusError: true,
  });

  const showError = () => {
    form.setError("email", { message: "" });
    form.setError("password", { message: "invalid email or password" });
    setIsLoading(false);
    form.setFocus("email");
  };

  const onSubmit = (data: AuthSchema) => {
    setIsLoading(true);
    signIn("credentials", { ...data, redirect: false })
      .then((callback) => {
        if (callback?.error) {
          return showError();
        }

        if (!callback?.error && callback?.ok) {
          router.push(callbackUrl);
        }
      })
      .catch(() => {
        return showError();
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Email:</FormLabel>
              <FormControl>
                <Input
                  required
                  type="email"
                  {...field}
                  onChange={(e) => {
                    form.clearErrors();
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Password:</FormLabel>
              <FormControl>
                <Input
                  required
                  type="password"
                  {...field}
                  onChange={(e) => {
                    form.clearErrors();
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-6 w-full" disabled={isLoading}>
          {isLoading ? <Spinner className="h-3 w-3" /> : "Login"}
        </Button>
        <p className="mt-4 text-center text-sm">
          Dont have an account?{" "}
          <Link className="font-semibold underline" href="/register">
            Sign Up
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
