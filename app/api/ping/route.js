import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Ping from "@/models/Ping";

export async function GET() {
  await connectToDatabase();
  const ping = await Ping.create({});
  return NextResponse.json({ success: true, timestamp: ping.timestamp });
}
