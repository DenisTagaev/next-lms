import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Course } from "@prisma/client";
import { NextResponse } from "next/server";
import { checkAuthorization } from "../utils";

export async function PATCH(
    req: Request,
    { params }: { params: {courseId: string}}
): Promise<NextResponse<unknown>> {
  try {
    const { userId }: { userId: string | null } = auth();
    checkAuthorization(!!userId);

    const _values = await req.json();

    const _course: Course = await db.course.update({
        where: { 
            id: params.courseId,
            userId: userId!,
        },
        data: {
            ..._values,
      },
    });

    return NextResponse.json(_course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
