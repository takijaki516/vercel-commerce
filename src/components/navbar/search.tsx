import { auth } from "@/auth";
import Link from "next/link";
import { PersonIcon } from "@radix-ui/react-icons";

import { HomeLogoIcon } from "../icons/home-logo";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Cart } from "../cart";
import Search from "../search";

export async function Navbar() {
  const session = await auth();
  const user = session?.user;

  return (
    <nav className="sticky inset-x-0 top-0 z-[100] h-14 w-full border-b border-gray-200">
      <Link href="/">
        <HomeLogoIcon />
        HOME
      </Link>

      <div>
        <Search />
      </div>

      <div>
        {/* NOTE: check user */}
        <Avatar>
          <AvatarFallback>
            <PersonIcon />
          </AvatarFallback>
        </Avatar>

        <Cart />
      </div>
    </nav>
  );
}
