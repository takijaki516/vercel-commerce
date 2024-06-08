import Image from "next/image";
import { ProductLabel } from "../product-label";
import { cn } from "@/lib/utils";

export function GridTileImage({
  isInteractive,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: number;
    currencyCode: string;
    position?: "bottom" | "center";
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={cn("f-ull group flex w-full", {
        relative: label,
        "border-2 border-blue-600": active,
        "border-neutral-200 dark:border-neutral-800": !active,
      })}
    >
      {props.src ? (
        <Image className={cn("relative h-full w-full")} {...props} />
      ) : null}

      {label ? (
        <ProductLabel
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </div>
  );
}
