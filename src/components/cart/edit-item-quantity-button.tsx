"use client";

import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import { CartItem } from "@prisma/client";
import { useFormState, useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { LoadingDots } from "../loading-dots";
import { UpdateItemQuantityParams, updateItemQuantity } from "./actions";

function SubmitButton({ type }: { type: "plus" | "minus" }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) {
          e.preventDefault();
        }
      }}
      aria-label={
        type === "plus" ? "Increase item quantity" : "Reduce item quantity"
      }
      aria-disabled={pending}
      className={cn(
        "flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2",
        {
          "cursor-not-allowed": pending,
          "ml-auto": type === "minus",
        },
      )}
    >
      {pending ? (
        <LoadingDots className="bg-black dark:bg-white" />
      ) : type === "plus" ? (
        <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  );
}

export function EditItemQuantityButton({
  item,
  type,
}: {
  item: CartItem;
  type: "plus" | "minus";
}) {
  const [message, formAction] = useFormState(updateItemQuantity, null);

  const payload = {
    itemId: item.id,
    quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
    variantId: item.productVariantId,
  } satisfies UpdateItemQuantityParams;

  const actionWithVariant = formAction.bind(null, payload);

  return (
    <form action={actionWithVariant}>
      <SubmitButton type={type} />
      <p aria-label="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
