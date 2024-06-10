import * as React from "react";

import { AdminMobileSidebar } from "../admin-sidebar/admin-mobile-sidebar";
import { ModeToggle } from "../theme-toggle";
import { AdminSidebarItems } from "../admin-sidebar/admin-sidebar-items";
import { AdminSidebarToggle } from "../admin-sidebar/admin-sidebar-toggle";

export async function AdminNavbar() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b px-4">
      <div className="flex items-center">
        <React.Suspense fallback={<div />}>
          <AdminMobileSidebar />
          <AdminSidebarToggle />
        </React.Suspense>
      </div>

      <div className="flex items-center">
        <ModeToggle />
      </div>
    </header>
  );
}
