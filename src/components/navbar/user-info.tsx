import { PersonIcon, EnterIcon } from "@radix-ui/react-icons";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import Link from "next/link";
import { Button } from "../ui/button";

export function UserInfo() {
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
          <EnterIcon />
        </Link>
      </DialogContent>
    </Dialog>
  );
}
