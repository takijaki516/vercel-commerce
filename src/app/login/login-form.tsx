"use client";

import * as React from "react";
import Link from "next/link";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { login } from "./actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getMessageFromCode } from "@/lib/utils";

export function LoginForm() {
  const router = useRouter();
  const [result, dispatch] = useFormState(login, undefined);

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
    <form action={dispatch} className="flex flex-col">
      <div>
        <h1 className="text-2xl font-bold">LOGIN</h1>
        <div>
          <div>
            <Label htmlFor="email" />
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter Email"
            />
          </div>
          <div>
            <Label htmlFor="password" />
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter Password"
            />
          </div>
        </div>
        <LoginButton />
      </div>

      <Link href="/signup">
        No account yet? <span>Sign up</span>
      </Link>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending}>
      {pending ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Login"}
    </Button>
  );
}
