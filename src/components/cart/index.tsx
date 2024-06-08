import { ShoppingCartLogoIcon } from "../icons/shopping-cart-logo";
import { Sheet, SheetHeader, SheetTrigger } from "../ui/sheet";

export function Cart() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <ShoppingCartLogoIcon />
      </SheetTrigger>
      <SheetHeader></SheetHeader>
    </Sheet>
  );
}
