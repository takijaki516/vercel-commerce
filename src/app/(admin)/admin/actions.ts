"use server";

import { prismaDB } from "@/lib/prisma-db";

async function getAllCollections() {
  return await prismaDB.collection.findMany({});
}
