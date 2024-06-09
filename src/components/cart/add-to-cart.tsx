"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { LoadingDots } from "../loading-dots";
import { addItem } from "./actions";
import { ProductVariant } from "@prisma/client";

function SubmitButton({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const { pending } = useFormStatus();
  const buttonClasses = "relative flex w-full items-center";
  const disabledClasses = "cursor-not-allowed";

  if (!availableForSale) {
    return <button>Out of Stock</button>;
  }

  if (!selectedVariantId) {
    return (
      <button className={cn()}>
        <div>
          <PlusIcon />
        </div>
      </button>
    );
  }

  return (
    <button>
      <div>
        {pending ? <LoadingDots className="mb-3 bg-white" /> : <PlusIcon />}
      </div>
    </button>
  );
}

export function AddToCart({
  availableForSale,
  variants,
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
}) {
  const [message, formAction] = useFormState(addItem, null);
  const searchParams = useSearchParams();
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;

  return (
    <form>
      <SubmitButton />
      <p>{message}</p>
    </form>
  );
}
