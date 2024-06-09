import NextAuth from "next-auth";

declare module "next-auth/adapters" {
  interface AdapterUser {
    salt?: string | null;
    hashedPassword?: string | null;
  }
}
