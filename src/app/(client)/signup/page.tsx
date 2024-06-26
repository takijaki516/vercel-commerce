import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SignUpForm } from "./signup-form";

export default async function SignupPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col p-4">
      <SignUpForm />
    </div>
  );
}
