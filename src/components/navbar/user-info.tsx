import { PersonIcon, EnterIcon } from "@radix-ui/react-icons";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import Link from "next/link";
import { Button } from "../ui/button";
import { ShoppingCartLogoIcon } from "../icons/shopping-cart-logo";

interface UserInfoProps {
  isAdmin: boolean;
}

export function UserInfo({ isAdmin }: UserInfoProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <PersonIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        {/* TODO: fix */}
        <Link href="/user-page">
          <ShoppingCartLogoIcon className="h-4 w-4 bg-white fill-pink-500" />
        </Link>
      </DialogContent>
    </Dialog>
  );
}
