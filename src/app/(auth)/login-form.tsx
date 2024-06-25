"use client";

import { authSchema } from "@/lib/validations/user";
import type { AuthSchema } from "@/lib/validations/user";
import { ControllerRenderProps, useForm } from "react-hook-form";
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
import { ChangeEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") ?? "/tasks";

  const form = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const showError = () => {
    setIsError(true);
    setIsLoading(false);
    form.setFocus("email");
  };

  const clearError = () => setIsError(false);

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
        {isError && (
          <span className="text-sm text-red-600">
            * Invalid Email or Password!
          </span>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel>Email:</FormLabel>
              <FormControl>
                <Input
                  required
                  type="email"
                  {...field}
                  onChange={(e) => {
                    clearError();
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
            <FormItem className="mt-6">
              <FormLabel>Password:</FormLabel>
              <FormControl>
                <Input
                  required
                  type="password"
                  {...field}
                  onChange={(e) => {
                    clearError();
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-6 w-full">
          Login
        </Button>
        <p className="mt-1 text-xs">
          Dont have account?{" "}
          <Link className="font-semibold hover:underline" href={"/register"}>
            Create Account.
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
