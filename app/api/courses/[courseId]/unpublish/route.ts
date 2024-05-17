import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Course } from "@prisma/client";
import { NextResponse } from "next/server";

import { checkAuthorization, checkExistingRecord, checkOwnership } from "@/app/api/courses/utils";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; } }
): Promise<NextResponse<unknown>> {
  try {
    const { userId }: { userId: string | null } = auth();
    checkAuthorization(!!userId);
    await checkOwnership(params.courseId, userId!);

    const _course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId!,
      }
    });
    checkExistingRecord(!!_course);  

    const _unpublishedCourse: Course = await db.course.update({
      where: {
        id: params.courseId,
        userId: userId!,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(_unpublishedCourse);
  } catch (error) {
    console.log("[COURSE_ID_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
