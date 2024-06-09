import NextAuth, { NextAuthConfig } from "next-auth";
// import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { Adapter } from "next-auth/adapters";

import { prismaDB } from "./lib/prisma-db";
import { getUserByEmail } from "./lib";
import { getStringFromBuffer } from "./lib/utils";

// TODO: add error handling
// NOTE: custom adapter to store salt
const customPrismaAdapterFactory = (p: PrismaClient): Adapter => {
  return {
    ...PrismaAdapter(p),
    createUser: async (user) => {
      if (user.salt && user.hashedPassword) {
        // NOTE: if user is signing up with credentials provider
        const res = await p.user.create({
          data: {
            email: user.email,
            hashedPassword: user.hashedPassword,
            salt: user.salt,
          },
        });

        return res;
      } else {
        return await p.user.create({
          data: {
            email: user.email,
            name: user.name,
            image: user.image,
            emailVerified: user.emailVerified,
          },
        });
      }
    },
  };
};

export const CustomPrismaAdapter = customPrismaAdapterFactory(prismaDB);

export const nextConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  providers: [
    // Google, // TODO: add google oauth
    Credentials({
      // credentials: {
      //   email: {},
      //   password: {},
      // },
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
          const saltedPassword = encoder.encode(password);
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
    async authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = request.nextUrl.pathname.startsWith("/login");
      const isOnSignupPage = request.nextUrl.pathname.startsWith("/signup");

      if (isLoggedIn) {
        if (isOnLoginPage || isOnSignupPage) {
          // REVIEW:
          return Response.redirect(new URL("/", request.nextUrl));
        }
      }

      return true;
    },
    jwt({ token, user }) {
      console.log("🚀 ~ file: auth.ts:108 ~ jwt ~ user:", user);
      console.log("🚀 ~ file: auth.ts:108 ~ jwt ~ token:", token);
      return token;
    },
    // TODO: check
    session({ session, user }) {
      console.log("🚀 ~ file: auth.ts:115 ~ session ~ user:", user);
      console.log("🚀 ~ file: auth.ts:115 ~ session ~ session:", session);
      return session;
    },
  },
  adapter: CustomPrismaAdapter,
  debug: true, // NOTE: for dev mode only
} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers } = NextAuth(nextConfig);
