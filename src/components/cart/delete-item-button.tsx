"use client";

import { Cross1Icon } from "@radix-ui/react-icons";
import { useFormState, useFormStatus } from "react-dom";

import { CartItem } from "@/lib/types";
import { LoadingDots } from "../loading-dots";
import { removeItemFromCart } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button>
      {pending ? <LoadingDots className="bg-white" /> : <Cross1Icon />}
    </button>
  );
}

export function DeleteItemButton({ itemId }: { itemId: string }) {
  const [message, formAction] = useFormState(removeItemFromCart, null);
  const actionWithVariant = formAction.bind(null, { itemId });

  return (
    <form action={actionWithVariant}>
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
