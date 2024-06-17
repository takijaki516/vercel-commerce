import * as React from "react";
import Link from "next/link";

import { AdminMobileSidebar } from "../admin-sidebar/admin-mobile-sidebar";
import { AdminSidebarToggle } from "../admin-sidebar/admin-sidebar-toggle";
import { ModeToggle } from "../theme-toggle";
import { auth } from "@/auth";
import { UserInfo } from "../navbar/user-info";

export async function AdminNavbar() {
  const session = await auth();

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

      <div className="flex justify-end md:w-1/3">
        {session ? (
          <>
            <UserInfo isAdmin={session.admin} />
          </>
        ) : (
          <Link
            href="/login"
            className="flex items-center space-x-1 text-neutral-300 underline-offset-4 hover:text-neutral-200 hover:underline"
          >
            <span>Login</span>
          </Link>
        )}

        <ModeToggle />
      </div>
    </header>
  );
}
