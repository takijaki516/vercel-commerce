"use client";

import { Cross1Icon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { useFormState, useFormStatus } from "react-dom";

import { CartItem } from "@/lib/types";
import { LoadingDots } from "../loading-dots";
import { removeItem } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button>
      {pending ? <LoadingDots className="bg-white" /> : <Cross1Icon />}
    </button>
  );
}

export function DeleteItemButton({ item }: { item: CartItem }) {
  const [message, formAction] = useFormState(removeItem, null);
  const itemId = item.id;
  const actionWithVariant = formAction.bind(null, itemId);

  return (
    <form action={actionWithVariant}>
      <SubmitButton />
      <p>{message}</p>
    </form>
  );
}
