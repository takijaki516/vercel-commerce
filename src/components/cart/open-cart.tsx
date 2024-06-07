import clsx from "clsx";
import { ShoppingCartLogoIcon } from "../icons/shopping-cart-logo";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div>
      <ShoppingCartLogoIcon />

      {quantity ? <div>{quantity}</div> : null}
    </div>
  );
}
