import { db } from "@/lib/db";
import { Chapter } from "@prisma/client";
import { NextResponse } from "next/server";

export const checkAuthorization = (
  param: boolean
): NextResponse<unknown> | undefined => {
    if (!param) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
}

export const checkOwnership = async(
  param: string, 
  id: string
): Promise<void> => {
    const isCourseOwner: boolean = (await db.course.findUnique({
      where: {
        id: param,
        userId: id,
      },
    }))
      ? true
      : false;

    checkAuthorization(isCourseOwner);
}

export const check_and_updateVoidCourse = async(courseId: string) => {
  const _publishedChInCourse: Chapter[] = await db.chapter.findMany({
    where: {
      courseId: courseId,
      isPublished: true,
    },
  });

  if (!_publishedChInCourse.length) {
    await db.course.update({
      where: {
        id: courseId,
      },
      data: {
        isPublished: false,
      },
    });
  }
}