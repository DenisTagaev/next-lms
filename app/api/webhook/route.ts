import Stripe from "stripe";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
    req: Request
): Promise<NextResponse<unknown>> {
    const body: string = await req.text();
    const signature: string = headers().get("Stripe-Signature") as string;
    
    let event: Stripe.Event;
    
    try {
        event = Stripe.webhooks.constructEvent(
          body,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`Stripe Webhook Error ${error.message}`,
         { status: 500 }
        );
    }

    const session: Stripe.Checkout.Session = event.data
      .object as Stripe.Checkout.Session;
    const userId: string | undefined = session.metadata?.userId;
    const courseId: string | undefined = session.metadata?.courseId;

    if(event.type === 'checkout.session.completed') {
        if(!userId || !courseId) {
            return new NextResponse(`Webhook is missing Metadata`,
             { status: 400 }
            );
        }

        await db.purchase.create({
            data: {
                courseId: courseId,
                userId: userId
            }
        })
    } else {
        return new NextResponse(`Unhandled Webhook event: ${event.type}`,
         { status: 200 }
        );
    }

    return new NextResponse(null, { status: 200 });
}