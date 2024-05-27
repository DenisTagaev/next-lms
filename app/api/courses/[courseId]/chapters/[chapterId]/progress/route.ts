import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { checkAuthorization } from "../../../../utils";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string }}
): Promise<NextResponse<unknown>> {
  try {
    const { userId }: { userId: string | null } = auth();
    checkAuthorization(!!userId);

    const { isCompleted }: { isCompleted: boolean } = await req.json();
    const _userProgression = await db.userProgression.upsert({
        where: {
            userId_chapterId: {
                userId: userId!,
                chapterId: params.chapterId,
            }
        },
        update: {
            isCompleted
        },
        create: {
            userId: userId!,
            chapterId: params.chapterId,
            isCompleted   
        }
    });

    return NextResponse.json(_userProgression);
  } catch (error) {
    console.log("[CHAPTER_ID_PROGRESS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
