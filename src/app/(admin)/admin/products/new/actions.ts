"use server";

import { z } from "zod";

import { prismaDB } from "@/lib/prisma-db";
import { ResultCode } from "@/lib/utils";

export async function getAllCollections() {
  const res = await prismaDB.collection.findMany({});
  return res;
}

interface Result {
  type: string;
  resultCode: ResultCode;
}
