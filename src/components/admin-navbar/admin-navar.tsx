import * as React from "react";
import Link from "next/link";

import { auth } from "@/auth";
import { AdminMobileSidebar } from "../admin-sidebar/admin-mobile-sidebar";
import { ModeToggle } from "../theme-toggle";
import { UserInfo } from "../navbar/user-info";

export async function AdminNavbar() {
  const session = await auth();

  if (!session) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b p-4 lg:px-6">
      <div className="flex items-center">
        <React.Suspense fallback={<div />}>
          <AdminMobileSidebar />
        </React.Suspense>
        <Link href="/" className="ml-2 underline-offset-4 hover:underline">
          Home
        </Link>
      </div>

      <div className="flex justify-end space-x-1 md:w-1/3">
        <UserInfo isAdmin={session.admin} />
        <ModeToggle />
      </div>
    </header>
  );
}
