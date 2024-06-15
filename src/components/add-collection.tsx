"use client";

import * as React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createCollection } from "@/app/(admin)/admin/collections/new/actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { getMessageFromCode } from "@/lib/utils";

export function AddCollection() {
  const router = useRouter();
  const [result, dispatch] = useFormState(createCollection, undefined);

  React.useEffect(() => {
    if (result) {
      if (result.type === "error") {
        toast.error(getMessageFromCode(result.resultCode));
      } else {
        toast.success(getMessageFromCode(result.resultCode));
        router.refresh();
        router.push("/admin/collections");
      }
    }
  }, [result, router]);

  return (
    <form
      className="flex w-full max-w-md flex-col space-y-3 lg:max-w-lg"
      action={dispatch}
    >
      <div>
        <Label htmlFor="title">title</Label>
        <Input
          id="title"
          type="text"
          name="title"
          placeholder="enter title"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">description</Label>
        <Input
          id="description"
          type="text"
          name="description"
          placeholder="enter description"
          required
        />
      </div>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
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
