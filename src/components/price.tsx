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
      {/* REVIEW: */}
      {`${new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "KRW",
        currencyDisplay: "narrowSymbol",
      }).format(amount)}`}
    </p>
  );
}
