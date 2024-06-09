import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import { getUserByEmail } from "./lib";
import { getStringFromBuffer } from "./lib/utils";

export const nextConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  providers: [
    // TODO: add google oauth
    Credentials({
      // TODO: add error handling
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUserByEmail(email);

          if (!user) return null;
          if (!user.salt) return null; // NOTE: this user is not created by credentials provider

          // REVIEW:
          const encoder = new TextEncoder();
          const saltedPassword = encoder.encode(password + user.salt);
          const hashedPasswordBuffer = await crypto.subtle.digest(
            "SHA-256",
            saltedPassword,
          );
          const hashedPassword = getStringFromBuffer(hashedPasswordBuffer);
          if (hashedPassword === user.hashedPassword) {
            return user;
          } else {
            return null;
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    // async authorized({ auth, request }) {
    //   const isLoggedIn = !!auth?.user;
    //   const isOnLoginPage = request.nextUrl.pathname.startsWith("/login");
    //   const isOnSignupPage = request.nextUrl.pathname.startsWith("/signup");
    //   if (isLoggedIn) {
    //     if (isOnLoginPage || isOnSignupPage) {
    //       // REVIEW:
    //       return Response.redirect(new URL("/", request.nextUrl));
    //     }
    //   }
    //   return true;
    // },
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, id: user.id, admin: user.admin };
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        const { id } = token as { id: string };
        const { user } = session;
        session = { ...session, user: { ...user, id } };
      }

      return session;
    },
  },
  // debug: true, // NOTE: for dev mode only
} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers } = NextAuth(nextConfig);
