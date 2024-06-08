import { cn } from "@/lib/utils";
import clsx from "clsx";

export function Price({
  amount,
  currencyCode,
  className,
  currencyCodeClassName,
}: {
  amount: number;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<"p">) {
  return (
    <p suppressHydrationWarning className={className}>
      {`${new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currencyCode,
        currencyDisplay: "narrowSymbol",
      }).format(amount)}`}
      <span
        className={cn("ml-1 inline", currencyCodeClassName)}
      >{`${currencyCodeClassName}`}</span>
    </p>
  );
}
