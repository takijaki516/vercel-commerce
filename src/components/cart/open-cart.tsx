import { cn } from "@/lib/utils";
import { ShoppingCartLogoIcon } from "../icons/shopping-cart-logo";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md border">
      <ShoppingCartLogoIcon
        className={cn(
          "h-4 transition-all ease-in-out hover:scale-110",
          className,
        )}
      />
      {quantity ? (
        <div className="absolute right-0 top-0 h-4 w-4 rounded bg-blue-600 text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
