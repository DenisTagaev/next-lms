import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Chapter } from "@prisma/client";
import { NextResponse } from "next/server";
import { checkAuthorization, checkOwnership } from "../../../utils";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string, chapterId: string} }
): Promise<NextResponse<unknown>> {
  try {
    const { userId }: { userId: string | null } = auth();
    checkAuthorization(!!userId);
    checkOwnership(params.courseId, userId!);

    const { isPublished, ...values } = await req.json();

    const chapter: Chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    });

    //TODO:Handle video update

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
