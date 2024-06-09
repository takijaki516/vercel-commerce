import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return (
      <div>
        <Link href="/'">GO TO HOME</Link>
        <div className="text-2xl">Not logged in</div>
      </div>
    );
  }

  if (!session.admin) {
    return (
      <div>
        <Link href="/'">GO TO HOME</Link>
        <div className="text-2xl">Not an admin</div>
      </div>
    );
  }

  return <div>{children}</div>;
}
