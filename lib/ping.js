import { connectToDatabase } from "@/lib/mongodb";
import Ping from "@/models/Ping";
import { sendPingNotification } from "@/lib/resend";

export async function recordPing() {
  await connectToDatabase();
  const ping = await Ping.create({});
  await sendPingNotification(ping.timestamp);
  return ping.timestamp;
}
