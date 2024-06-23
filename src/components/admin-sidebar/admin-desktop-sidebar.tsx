import { auth } from "@/auth";
import { AdminSidebar } from "./admin-sidebar";
import { AdminSidebarItems } from "./admin-sidebar-items";

export async function AdminDesktopSidebar() {
  const session = await auth();

  if (!session?.admin) {
    return null;
  }

  return (
    <AdminSidebar className="absolute inset-y-0 z-30 hidden border-r duration-300 ease-in-out lg:flex lg:w-[250px] xl:w-[300px]">
      <AdminSidebarItems />
    </AdminSidebar>
  );
}
