import { cn } from "@/lib/utils";

export function Price({
  amount,
  className,
}: {
  amount: number;
  className?: string;
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
