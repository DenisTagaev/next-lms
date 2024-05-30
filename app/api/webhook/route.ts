import Stripe from "stripe";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";

export const config: {
  api: {
    bodyParser: boolean;
  };
} = {
  api: {
    bodyParser: false,
  },
};

export async function POST(
    req: NextRequest
): Promise<NextResponse<unknown>> {
    const body: string = await req.text();
    const signature = headers().get("Stripe-Signature") as string;    

    let event: Stripe.Event;
    
    try {
        event = stripe.webhooks.constructEvent(
          body,
          signature,
          process.env.NODE_ENV !== "production"
            ? process.env.STRIPE_WEBHOOK_LOCAL_SECRET!
            : process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {    
        return new NextResponse(`Stripe Webhook Error ${error.message}`,
         { status: 400 }
        );
    }

    const session: Stripe.Checkout.Session = event.data
      .object as Stripe.Checkout.Session;
    const userId: string | undefined = session.metadata?.userId;
    const courseId: string | undefined = session.metadata?.courseId;

    if(event.type === "checkout.session.completed") {
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
        });
    } else {
        return new NextResponse(`Unhandled Webhook event: ${event.type}`,
         { status: 200 }
        );
    }

    return new NextResponse(null, { status: 200 });
}