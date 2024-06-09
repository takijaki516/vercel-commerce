import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  const session = await auth();
  console.log("🚀 ~ file: pazge.tsx:8 ~ LoginPage ~ session:", session);

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col p-4">
      <LoginForm />
    </div>
  );
}
