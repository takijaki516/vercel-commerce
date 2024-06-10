"use client";

import { useAdminSidebar } from "@/lib/hooks/use-sidebar";
import { cn } from "@/lib/utils";

interface AdminSidebarProps extends React.ComponentProps<"div"> {}

export function AdminSidebar({ className, children }: AdminSidebarProps) {
  const { isAdminSidebarOpen, isLoading } = useAdminSidebar();

  return (
    <div
      data-state={isAdminSidebarOpen && !isLoading ? "open" : "closed"}
      className={cn(className, "h-full flex-col bg-neutral-900")}
    >
      {children}
    </div>
  );
}
