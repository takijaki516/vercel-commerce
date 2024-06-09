import NextAuth from "next-auth";
import { nextConfig } from "./auth";

const { auth } = NextAuth(nextConfig);

export default auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
