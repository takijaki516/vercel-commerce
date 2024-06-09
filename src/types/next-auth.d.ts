import NextAuth from "next-auth";
import { User as PrismaUser } from "@prisma/client";

declare module "next-auth/adapters" {
  interface AdapterUser {
    salt?: string | null;
    hashedPassword?: string | null;
  }
}

declare module "next-auth" {
  interface User extends Partial<PrismaUser> {}

  interface Session {
    admin: boolean;
  }
}
