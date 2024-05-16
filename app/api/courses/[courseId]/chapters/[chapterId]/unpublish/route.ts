import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Chapter } from "@prisma/client";
import { NextResponse } from "next/server";

import { checkAuthorization, checkOwnership } from "@/app/api/courses/utils";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
): Promise<NextResponse<unknown>> {
  try {
    const { userId }: { userId: string | null } = auth();
    checkAuthorization(!!userId);
    await checkOwnership(params.courseId, userId!);

    const _unpublishedChapter: Chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: false,
      },
    });



    return NextResponse.json(_unpublishedChapter);
  } catch (error) {
    console.log("[COURSES_CHAPTER_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
