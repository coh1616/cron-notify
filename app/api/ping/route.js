import { NextResponse } from "next/server";
import { recordPing } from "@/lib/ping";

export async function GET(request) {
  const secret = request.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const timestamp = await recordPing();
  return NextResponse.json({ success: true, timestamp });
}
