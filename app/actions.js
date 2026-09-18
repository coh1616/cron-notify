"use server";

import { recordPing } from "@/lib/ping";

export async function triggerPing() {
  try {
    const timestamp = await recordPing();
    return { success: true, timestamp };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
