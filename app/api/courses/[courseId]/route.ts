import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Course } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: {courseId: string}}
): Promise<NextResponse<unknown>> {
  try {
    const { userId }: { userId: string | null } = auth();
    
    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { courseId }: { courseId: string } = params;
    const _values = await req.json();

    const course: Course = await db.course.update({
        where: { 
            id: courseId,
            userId,
        },
        data: {
            ..._values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
