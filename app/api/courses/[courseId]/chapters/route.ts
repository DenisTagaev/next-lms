import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Chapter } from "@prisma/client";
import { NextResponse } from "next/server";
import { checkAuthorization, checkOwnership } from "../../utils";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
): Promise<NextResponse<unknown>> {
  try {
    const { userId }: { userId: string | null } = auth();
    const { title }: { title: string} = await req.json();

    checkAuthorization(!!userId);
    checkOwnership(params.courseId, userId!);

    const prevChapter: Chapter | null = await db.chapter.findFirst({
      where: { 
        courseId: params.courseId
      },
      orderBy: { 
        position: "desc"
      }
    });

    const newChapter: Chapter = await db.chapter.create({
      data: {
        title,
        courseId: params.courseId,
        position: prevChapter ? prevChapter.position + 1 : 1
      },
    });

    return NextResponse.json(newChapter);
  } catch (error) {
    console.log("[COURSE_ID_CHAPTERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
