import { cn } from "@/lib/utils";

export function Price({
  amount,
  className,
  currencyCodeClassName,
}: {
  amount: number;
  className?: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<"p">) {
  return (
    <p suppressHydrationWarning className={className}>
      {`${new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "KRW",
        currencyDisplay: "narrowSymbol",
      }).format(amount)}`}
      {/* REVIEW: */}
      <span
        className={cn("ml-1 inline", currencyCodeClassName)}
      >{`${currencyCodeClassName}`}</span>
    </p>
  );
}
