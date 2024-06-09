"use client";

import * as React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { signup } from "./actions";
import { getMessageFromCode } from "@/lib/utils";

export function SignUpForm() {
  const router = useRouter();
  const [result, dispatch] = useFormState(signup, undefined);

  React.useEffect(() => {
    if (result) {
      if (result.type === "error") {
        toast.error(getMessageFromCode(result.resultCode));
      } else {
        toast.success(getMessageFromCode(result.resultCode));
        router.refresh();
      }
    }
  }, [result, router]);

  return (
    <form
      action={dispatch}
      className="flex flex-col items-center gap-4 space-y-3"
    >
      <div className="w-full flex-1 rounded-lg border bg-neutral-200 px-6 pb-4 pt-8 shadow-md dark:bg-black dark:text-neutral-300 md:w-96">
        <h1 className="mb-4 text-2xl font-bold">Sign UP</h1>

        <div className="w-full">
          <div className="flex flex-col space-y-3">
            <Label
              htmlFor="email"
              className="text-xs font-medium text-neutral-400"
            >
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter Email"
              required
              className="px-2 py-[9px] outline-none placeholder:text-neutral-400"
            />
          </div>
          <div className="mt-4 flex flex-col space-y-3">
            <Label
              htmlFor="password"
              className="text-xs font-medium text-neutral-400"
            >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Your Password"
              required
              minLength={6}
              className="px-2 py-[9px] outline-none placeholder:text-neutral-400"
            />
          </div>
        </div>
        <SignupButton />
      </div>

      <Link
        href="/login"
        className="flex flex-row gap-1 text-sm text-neutral-400"
      >
        Already have an account?
        <span className="font-semibold underline">Log in</span>
      </Link>
    </form>
  );
}

function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className="my-4 flex h-10 w-full flex-row items-center justify-center"
      aria-disabled={pending}
    >
      {pending ? <ReloadIcon /> : "Create Account"}
    </Button>
  );
}
