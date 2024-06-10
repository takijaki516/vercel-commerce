"use client";

import { ColumnsIcon } from "@radix-ui/react-icons";

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { AdminSidebar } from "./admin-sidebar";
import { AdminSidebarItems } from "./admin-sidebar-items";

export function AdminMobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="flex p-2 lg:hidden">
          <ColumnsIcon className="size-6 text-pink-400" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="inset-y-0 flex h-auto w-[300px] flex-col bg-neutral-900 p-0"
      >
        <AdminSidebar className="flex">
          <AdminSidebarItems />
        </AdminSidebar>
      </SheetContent>
    </Sheet>
  );
}
