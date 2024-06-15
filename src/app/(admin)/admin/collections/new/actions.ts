"use server";

import { z } from "zod";

import { prismaDB } from "@/lib/prisma-db";
import { ResultCode } from "@/lib/utils";
import { Collection } from "@prisma/client";

interface Result {
  type: string;
  resultCode: ResultCode;
  data?: Collection;
}

export async function createCollection(
  _prevState: Result | undefined,
  formData: FormData,
): Promise<Result | undefined> {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  const parsedCollections = z
    .object({ title: z.string(), description: z.string() })
    .safeParse({ title, description });

  let collection = await prismaDB.collection.findUnique({
    where: {
      title,
    },
  });

  if (parsedCollections.error) {
    return {
      type: "error, invalid form data",
      resultCode: ResultCode.CollectionFormInvalid,
    };
  }

  if (collection) {
    return {
      type: "error",
      resultCode: ResultCode.CollectionAlreadyExists, // TODO: Collection
    };
  }

  collection = await prismaDB.collection.create({
    data: {
      title: parsedCollections.data.title,
      description: parsedCollections.data.description,
    },
  });

  return {
    type: "success",
    resultCode: ResultCode.CollectionCreated,
    data: collection,
  };
}
