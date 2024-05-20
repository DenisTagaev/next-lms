import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Chapter, MuxData } from "@prisma/client";
import { NextResponse } from "next/server";

import { checkAuthorization, checkOwnership, check_and_updateVoidCourse } from "@/app/api/courses/utils";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
): Promise<NextResponse<unknown>> {
  try {
    const { userId }: { userId: string | null } = auth();
    checkAuthorization(!!userId);
    await checkOwnership(params.courseId, userId!);

    const _chapter: Chapter | null = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      }
    });
    
    const _muxData: MuxData | null = await db.muxData.findUnique({
      where: {
        chapterId: params.chapterId,
      },
    });

    if (
      !_chapter ||
      !_muxData ||
      !_chapter.title ||
      !_chapter.description ||
      !_chapter.videoUrl
    ) {
        console.log(!_chapter, !_muxData, _chapter.title, _chapter.description, _chapter.videoUrl);
        
        return new NextResponse("Missing required fields", { status: 401 });
    }

    const _publishedChapter: Chapter = await db.chapter.update({
        where: {
            id: params.chapterId,
            courseId: params.courseId,
        },
        data: {
            isPublished: true
        }
    });
    await check_and_updateVoidCourse(params.courseId);

    return NextResponse.json(_publishedChapter);
  } catch (error) {
    console.log("[COURSES_CHAPTER_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
