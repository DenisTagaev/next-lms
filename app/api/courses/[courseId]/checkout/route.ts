import { db } from "@/lib/db";
import Stripe from "stripe";
import { Course, Purchase } from "@prisma/client";
import { NextResponse } from "next/server";
import { User, currentUser } from "@clerk/nextjs/server";

import { checkAuthorization, checkExistingRecord } from "@/app/api/courses/utils";
import { stripe } from "@/lib/stripe";

export async function POST(
    req: Request,
    { params }: { params: { courseId: string }}
): Promise<NextResponse<unknown>> {
  try {
    const user: User | null = await currentUser();
    checkAuthorization(!!user);
    checkAuthorization(!!user!.id);
    checkAuthorization(!!user?.emailAddresses?.[0]?.emailAddress);

    const _course: Course | null = await db.course.findUnique({
      where: {
        id: params.courseId!,
        isPublished: true,
      },
    });
    checkExistingRecord(!!_course);

    const _purchase: Purchase | null = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user!.id,
          courseId: params.courseId
        },
      },
    });

    if(_purchase) {
        return new NextResponse("Already purchased", { status: 400 });
    }

    const _line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =[
        {
            quantity: 1,
            price_data: {
                currency: "USD",
                product_data: {
                    name: _course!.title,
                    description: _course!.description!,
                    metadata: { id: _course!.id },
                },
            unit_amount: Math.round(_course?.price! * 100),
            },
        }
    ];
        
    let _stripeCustomer: {
      stripeCustomerId: string;
    } | null = await db.stripeCustomer.findUnique({
      where: {
        userId: user!.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if(!_stripeCustomer) {
        const _customer: Stripe.Response<Stripe.Customer> =
          await stripe.customers.create({
            email: user!.emailAddresses[0].emailAddress,
          });

        _stripeCustomer = await db.stripeCustomer.create({
            data: {
                userId: user!.id,
                stripeCustomerId: _customer.id
            }
        });
    }

    const _session = await stripe.checkout.sessions.create({
        customer: _stripeCustomer.stripeCustomerId,
        line_items: _line_items,
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/corses/${_course!.id}?success=1`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${_course!.id}?canceled=1}`,
        metadata: {
            courseId: _course!.id,
            userId: user!.id
        }
    });

    return NextResponse.json({ url: _session.url });
  } catch (error) {
    console.log(`[COURSE_${params.courseId}_CHECKOUT]`, error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
