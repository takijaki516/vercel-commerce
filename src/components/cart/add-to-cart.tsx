"use client";

import { useFormState, useFormStatus } from "react-dom";
import { PlusIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import { ProductVariant } from "@prisma/client";

import { cn } from "@/lib/utils";
import { LoadingDots } from "../loading-dots";
import { Button } from "../ui/button";
import { addItemToCart } from "./actions";

function SubmitButton({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const { pending } = useFormStatus();

  const buttonClasses =
    "relative flex w-full items-center justify-center rounded-full bg-blue-600 py-6 px-4 tracking-wide text-whit hover:bg-blue-600";

  if (!availableForSale) {
    return (
      <Button
        aria-disabled
        disabled
        className={cn(buttonClasses, "cursor-not-allowed hover:opacity-60")}
      >
        Out of Stock
      </Button>
    );
  }

  if (!selectedVariantId) {
    return (
      <Button
        aria-label="please select an option"
        aria-disabled
        disabled
        className={cn(buttonClasses, "cursor-not-allowed hover:opacity-60")}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon />
        </div>
        Add To Cart
      </Button>
    );
  }

  return (
    <Button
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) {
          e.preventDefault();
        }
      }}
      aria-label="add to cart"
      aria-disabled={pending}
      className={cn(buttonClasses, {
        "hover:opacity-90": true,
        "cursor-not-allowed": pending,
      })}
    >
      <div className="absolute left-0 ml-4">
        {pending ? (
          <LoadingDots className="mb-3 bg-white" />
        ) : (
          <PlusIcon className="h-5 w-5" />
        )}
      </div>
      Add To Cart
    </Button>
  );
}

export function AddToCart({
  availableForSale,
  variants,
  productId,
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
  productId: string;
}) {
  const [message, formAction] = useFormState(addItemToCart, null);
  const searchParams = useSearchParams();
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;

  const currentVariant = searchParams.get("size");

  const variant = variants.find(
    (variant: ProductVariant) => variant.size === currentVariant,
  );
  const selectedVariantId = variant?.id || defaultVariantId;

  // REVIEW:
  const actionWithVariant = formAction.bind(null, {
    productId,
    selectedVariantId,
  });

  return (
    <form action={actionWithVariant}>
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
