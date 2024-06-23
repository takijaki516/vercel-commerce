import Link from "next/link";
import { PersonIcon } from "@radix-ui/react-icons";

import { signOut } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

interface UserInfoProps {
  isAdmin: boolean;
}

export function UserInfo({ isAdmin }: UserInfoProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <PersonIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="flex flex-col items-start">
        {isAdmin && (
          <>
            <DropdownMenuItem asChild>
              <Button variant={"ghost"}>
                <Link href="/admin/dashboard">
                  <div>Admin Page</div>
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        <form
          action={async () => {
            "use server";
            await signOut();
          }}
          className="w-full"
        >
          <button
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full text-destructive hover:text-destructive",
            )}
          >
            Sign Out
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
