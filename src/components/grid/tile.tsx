import Image from "next/image";

import { ProductLabel } from "../product-label";
import { cn } from "@/lib/utils";

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  alt,
  src,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: number;
    position?: "bottom" | "center";
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={cn(
        "group/tile flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black dark:hover:border-blue-600",
        {
          relative: label,
          "border-2 border-blue-600": active, // REVIEW: what is active?
          "border-neutral-200 dark:border-neutral-800": !active,
        },
      )}
    >
      {src ? (
        <Image
          className={cn(
            "relative h-full w-full object-contain dark:hover:border-blue-600",
            {
              "transition duration-300 ease-in-out group-hover/tile:scale-105":
                isInteractive,
            },
          )}
          src={src}
          alt={alt}
          {...props}
        />
      ) : null}

      {label ? (
        <ProductLabel
          title={label.title}
          amount={label.amount}
          position={label.position}
        />
      ) : null}
    </div>
  );
}
