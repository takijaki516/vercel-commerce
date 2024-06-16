import * as React from "react";
import Link from "next/link";

import { AdminMobileSidebar } from "../admin-sidebar/admin-mobile-sidebar";
import { AdminSidebarToggle } from "../admin-sidebar/admin-sidebar-toggle";
import { ModeToggle } from "../theme-toggle";

export async function AdminNavbar() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b px-4">
      <div className="flex items-center">
        <React.Suspense fallback={<div />}>
          <AdminMobileSidebar />
          <AdminSidebarToggle />
        </React.Suspense>
        <Link href="/" className="ml-2 underline-offset-4 hover:underline">
          Home
        </Link>
      </div>

      <div className="flex items-center">
        <ModeToggle />
      </div>
    </header>
  );
}
