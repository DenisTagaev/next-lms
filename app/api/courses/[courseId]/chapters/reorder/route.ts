import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Chapter } from "@prisma/client";

import { checkAuthorization, checkOwnership } from "@/app/api/courses/utils";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } }
): Promise<NextResponse<unknown>> {
  try {
    const { userId }: { userId: string | null } = auth();
    checkAuthorization(!!userId);
    await checkOwnership(params.courseId, userId!);

    const { list } : { list: Chapter[] } = await req.json();

    for(let chapter of list) {
        await db.chapter.update({
          where: {
            id: chapter.id
          },
          data: {
            position: chapter.position
          },
        });
    }

    return new NextResponse("Success", { status: 200});
  } catch (error) {
    console.log("[CHAPTERS_REORDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
