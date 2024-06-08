import { Price } from "./price";

export function ProductLabel({
  title,
  amount,
  currencyCode,
  position = "bottom",
}: {
  title: string;
  amount: number;
  currencyCode: string;
  position?: "bottom" | "center";
}) {
  return (
    <div>
      <div>
        <h3>{title}</h3>
        <Price
          className="flex-none"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden "
        />
      </div>
    </div>
  );
}
