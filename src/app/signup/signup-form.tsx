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
      <div>
        <h1>Sign UP</h1>
      </div>
      <div>
        <div>
          <Label htmlFor="email" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Your Email"
          />
        </div>
        <div>
          <Label htmlFor="password" />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Your Password"
          />
        </div>
        <SignupButton />
      </div>

      <Link href="/login">
        Already have an account?
        <span>Log in</span>
      </Link>
    </form>
  );
}

function SignupButton() {
  const { pending } = useFormStatus();

  return <Button>{pending ? <ReloadIcon /> : "Create Account"}</Button>;
}
