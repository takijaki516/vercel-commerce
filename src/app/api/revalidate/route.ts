import { NextRequest, NextResponse } from "next/server";

import { revalidate } from "@/lib/shopify";

export async function GET(req: NextRequest): Promise<NextResponse> {
  return revalidate(req);
}
