import Link from "next/link";
import { PersonIcon, EnterIcon, Cross1Icon } from "@radix-ui/react-icons";
import { signOut } from "@/auth";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

interface UserInfoProps {
  isAdmin: boolean;
}

export function UserInfo({ isAdmin }: UserInfoProps) {
  async function onLogout() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <PersonIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col items-start">
        <DropdownMenuItem asChild>
          <Button
            className="w-full justify-start hover:cursor-pointer"
            onClick={onLogout}
            variant={"ghost"}
          >
            LOGOUT
          </Button>
        </DropdownMenuItem>
        {isAdmin && (
          <DropdownMenuItem asChild>
            <Button variant={"ghost"}>
              <Link href="/admin/dashboard">
                <div>ADMIN PAGE</div>
              </Link>
            </Button>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
