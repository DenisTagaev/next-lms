import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Chapter } from "@prisma/client";
import { NextResponse } from "next/server";

import { checkAuthorization, checkOwnership } from "@/app/api/courses/utils";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
): Promise<NextResponse<unknown>> {
  try {
    const { userId }: { userId: string | null } = auth();
    checkAuthorization(!!userId);
    await checkOwnership(params.courseId, userId!);
    
    const { title }: { title: string } = await req.json();

    const _prevChapter: Chapter | null = await db.chapter.findFirst({
      where: { 
        courseId: params.courseId
      },
      orderBy: { 
        position: "desc"
      }
    });

    const _newChapter: Chapter = await db.chapter.create({
      data: {
        title,
        courseId: params.courseId,
        position: _prevChapter ? _prevChapter.position + 1 : 1
      },
    });

    return NextResponse.json(_newChapter);
  } catch (error) {
    console.log("[COURSE_ID_CHAPTERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
