import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Ping from "@/models/Ping";

export async function GET(request) {
  const secret = request.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const ping = await Ping.create({});
  return NextResponse.json({ success: true, timestamp: ping.timestamp });
}
