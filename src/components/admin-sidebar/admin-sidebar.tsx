"use client";

import { cn } from "@/lib/utils";

interface AdminSidebarProps extends React.ComponentProps<"div"> {}

export function AdminSidebar({ className, children }: AdminSidebarProps) {
  return (
    <div
      data-state={"open"}
      className={cn(className, "h-full flex-col bg-neutral-900")}
    >
      {children}
    </div>
  );
}
