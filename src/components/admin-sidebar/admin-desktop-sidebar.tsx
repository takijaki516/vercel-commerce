import { auth } from "@/auth";
import { AdminSidebar } from "./admin-sidebar";
import { AdminSidebarItems } from "./admin-sidebar-items";

export async function AdminDesktopSidebar() {
  const session = await auth();

  if (!session?.admin) {
    return null;
  }

  return (
    <AdminSidebar className="peer absolute inset-y-0 z-30 hidden -translate-x-full border-r duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]">
      <AdminSidebarItems />
    </AdminSidebar>
  );
}
