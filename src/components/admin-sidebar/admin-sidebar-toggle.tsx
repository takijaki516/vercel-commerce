"use client";

import * as React from "react";
import { ColumnsIcon } from "@radix-ui/react-icons";

import { useAdminSidebar } from "@/lib/hooks/use-sidebar";
import { Button } from "../ui/button";

export function AdminSidebarToggle() {
  const { toggleSidebar } = useAdminSidebar();

  return (
    <Button
      variant={"ghost"}
      className="hidden p-2 lg:flex"
      onClick={toggleSidebar}
    >
      <ColumnsIcon className="size-6" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}
