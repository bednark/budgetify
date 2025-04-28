import { NextResponse } from "next/server"
import { PushSubscriptionModel } from "@/lib/models";
import connectToDatabase from "@/lib/utils";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const subscription = await request.json();
    const existing = await PushSubscriptionModel.findOne({ endpoint: subscription.endpoint });

    if (existing) {
      return NextResponse.json({ success: true, message: "Subskrypcja już istnieje." });
    }

    await PushSubscriptionModel.create({
      endpoint: subscription.endpoint,
      keys: {
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
      }
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
