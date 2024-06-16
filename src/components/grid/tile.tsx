import Image from "next/image";

import { ProductLabel } from "../product-label";
import { cn } from "@/lib/utils";

export function GridTileImage({
  isInteractive,
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
        "group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 hover:ring-purple-600 dark:bg-black",
        {
          relative: label,
          "border-2 border-blue-600 hover:ring-purple-600": active,
          "border-neutral-200 hover:ring-purple-600 dark:border-neutral-800":
            !active,
        },
      )}
    >
      {src ? (
        <Image
          className={cn(
            "relative h-full w-full object-contain p-2 hover:border-blue-600",
            {
              "transition duration-300 ease-in-out group-hover:scale-105":
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
