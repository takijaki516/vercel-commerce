"use server";

import { z } from "zod";
import { CustomPrismaAdapter, signIn } from "@/auth";
import { AuthError } from "next-auth";

import { ResultCode, getStringFromBuffer } from "@/lib/utils";
import { prismaDB } from "@/lib/prisma-db";

interface Result {
  type: string;
  resultCode: ResultCode;
}

export async function signup(
  _prevState: Result | undefined,
  formData: FormData,
): Promise<Result | undefined> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const parsedCredentials = z
    .object({
      email: z.string().email(),
      password: z.string().min(6),
    })
    .safeParse({
      email,
      password,
    });

  // TODO:
  let user: any = await prismaDB.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return {
      type: "error",
      resultCode: ResultCode.UserAlreadyExists,
    };
  }

  if (parsedCredentials.success) {
    const salt = crypto.randomUUID();
    const encoder = new TextEncoder();
    const saltedPassword = encoder.encode(password + salt);
    const hashedPasswordBuffer = await crypto.subtle.digest(
      "SHA-256",
      saltedPassword,
    );
    const hashedPassword = getStringFromBuffer(hashedPasswordBuffer);

    // TODO: add error handling
    if (CustomPrismaAdapter.createUser) {
      user = await CustomPrismaAdapter.createUser({
        emailVerified: null,
        email,
        id: "", // NOTE: doesn't matter anyway
        salt,
        hashedPassword,
      });

      await signIn("credentials", {
        email: user.email,
        password: user.hashedPassword,
        redirect: false,
      });

      return {
        type: "success",
        resultCode: ResultCode.UserCreated,
      };
    } else {
      return {
        type: "error",
        resultCode: ResultCode.UnknownError,
      };
    }
  } else {
    return {
      type: "error",
      resultCode: ResultCode.InvalidCredentials,
    };
  }
}
