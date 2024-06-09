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
    return redirect("/");
  }

  if (!session.admin) {
    return (
      <div className="flex flex-col items-center space-y-4 pt-10">
        <div className="text-4xl text-neutral-400">You are not an admin</div>
        <Link
          className="text-2xl text-neutral-400 underline underline-offset-8 hover:text-neutral-300"
          href="/'"
        >
          GO TO HOME
        </Link>
      </div>
    );
  }

  return <div className="min-h-screen">{children}</div>;
}
