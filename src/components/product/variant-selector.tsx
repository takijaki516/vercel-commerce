"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn, createUrl } from "@/lib/utils";
import { ProductVariant } from "@prisma/client";
import { Button } from "../ui/button";

export function VariantSelector({
  sizeVariants,
}: {
  sizeVariants: ProductVariant[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (sizeVariants.length === 0) return null;

  return (
    <ul className="mb-10">
      <h3 className="mb-4 text-sm tracking-wide">SIZE</h3>
      <div className="flex flex-wrap gap-3">
        {sizeVariants.map((variant, idx) => {
          const isAvailable = variant.available && variant.count > 0;

          const optionSearchParams = new URLSearchParams(
            searchParams.toString(),
          );
          optionSearchParams.set("size", variant.size);
          const optionURL = createUrl(pathname, optionSearchParams);

          const isActive = searchParams.get("size") === variant.size;

          return (
            <li key={idx}>
              <Button
                variant={"outline"}
                aria-disabled={!isAvailable}
                disabled={!isAvailable}
                className={cn("rounded-full", {
                  "cursor-default ring-2 ring-blue-600": isActive,
                  "ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-blue-600":
                    !isActive && isAvailable,
                  "relative z-10 cursor-not-allowed overflow-hidden ring-1 ring-transparent before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:before:bg-neutral-500":
                    !isAvailable,
                })}
                onClick={() => {
                  router.replace(optionURL, { scroll: false });
                }}
              >
                {variant.size}
              </Button>
            </li>
          );
        })}
      </div>
    </ul>
  );
}
