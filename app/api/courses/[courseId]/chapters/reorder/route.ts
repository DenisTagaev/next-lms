import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Course } from "@prisma/client";
import { NextResponse } from "next/server";
import { checkAuthorization, checkOwnership } from "../../../utils";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } }
): Promise<NextResponse<unknown>> {
  try {
    const { userId }: { userId: string | null } = auth();
    checkAuthorization(!!userId);
    const { courseId }: { courseId: string } = params;
    checkOwnership(courseId, userId!);

    const { list } = await req.json();

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
    console.log("[COURSES_REORDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
