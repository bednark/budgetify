import { NextResponse } from "next/server";
import webpush from "web-push";
import { getExpensesForTomorrow } from "@/lib/data";
import connectToDatabase from "@/lib/utils";
import { PushSubscriptionModel, ExpensesModel } from "@/lib/models";

const apiKey:string = process.env.API_KEY || "";

webpush.setVapidDetails(
  "mailto:admin@budgetify.pl",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(request: Request) {
  if (!apiKey) {
    return NextResponse.json({ success: false }, { status: 500 });
  }

  const receivedApiKey = request.headers.get("x-api-key");
  if (receivedApiKey !== apiKey) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const expenses = await getExpensesForTomorrow();

    if (expenses.length === 0) {
      return NextResponse.json({ success: true, message: "No expenses for tomorrow" });
    }

    const subscriptions = await PushSubscriptionModel.find();

    if (subscriptions.length === 0) {
      return NextResponse.json({ success: true, message: "No subscribers" });
    }

    const payload = JSON.stringify({
      title: "Przypomnienie Budgetify!",
      body: `Masz ${expenses.length} zaplanowane wydatki na jutro.`,
    });

    const results = await Promise.allSettled(
      subscriptions.map(async (sub) => {
        try {
          await webpush.sendNotification(
            {
              endpoint: sub.endpoint,
              keys: {
                p256dh: sub.keys.p256dh,
                auth: sub.keys.auth,
              },
            },
            payload
          );
        } catch (err) {    
          const error = err as { statusCode: number };
          if (error.statusCode === 410 || error.statusCode === 404) {
            console.log("Deleting invalid subscription:", sub.endpoint);
            await PushSubscriptionModel.deleteOne({ _id: sub._id });
          }
        }
      })
    );

    const expenseIds = expenses.map(exp => exp._id);

    await ExpensesModel.updateMany(
      { _id: { $in: expenseIds } },
      { $set: { notified: true } }
    );
    return NextResponse.json({ success: true, sent: results.length });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
