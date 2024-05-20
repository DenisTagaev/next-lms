import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Course } from "@prisma/client";
import { NextResponse } from "next/server";

import { checkAuthorization, checkExistingRecord, checkOwnership } from "@/app/api/courses/utils";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
): Promise<NextResponse<unknown>> {
  try {
    const { userId }: { userId: string | null } = auth();
    checkAuthorization(!!userId);
    await checkOwnership(params.courseId, userId!);

    const _course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId!,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });
    checkExistingRecord(!!_course);  

    const hasPublishedChapter: boolean = _course!.chapters.some((ch) => ch.isPublished);

    if (
      !hasPublishedChapter ||
      !_course!.title ||
      !_course!.categoryId ||
      !_course!.description ||
      !_course!.imageUrl
    ) {
        return new NextResponse("Missing required fields", { status: 401 });
    }

    const _publishedCourse: Course = await db.course.update({
      where: {
        id: params.courseId,
        userId: userId!,
      },
      data: {
        isPublished: true
      }
    })

    return NextResponse.json(_publishedCourse);
  } catch (error) {
    console.log("[COURSE_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
