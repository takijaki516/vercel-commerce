import { auth } from "@/auth";

export default async function AdminPage() {
  const session = await auth();
  if (!session || !session.admin) {
    return null;
  }

  return <div>ADMIN PAGE</div>;
}
