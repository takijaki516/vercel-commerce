"use server";

import { z } from "zod";

import { signIn } from "@/auth";
import { prismaDB } from "@/lib/prisma-db";
import { ResultCode, getStringFromBuffer } from "@/lib/utils";

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

    // REVIEW:
    user = await prismaDB.user.create({
      data: {
        email,
        salt,
        hashedPassword,
        cart: { create: {} },
      },
    });

    await signIn("credentials", {
      email: parsedCredentials.data.email,
      password: parsedCredentials.data.password,
      redirect: false,
    });

    return {
      type: "success",
      resultCode: ResultCode.UserCreated,
    };
  } else {
    return {
      type: "error",
      resultCode: ResultCode.InvalidCredentials,
    };
  }
}
