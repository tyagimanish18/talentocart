import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { listLeads } from "@/lib/db";

export async function GET() {
  const ok = await isAuthenticated();
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const leads = listLeads();
  return NextResponse.json({ leads });
}
