import Mux from "@mux/mux-node";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Course } from "@prisma/client";
import { NextResponse } from "next/server";

import { checkAuthorization, checkExistingRecord, checkOwnership } from "@/app/api/courses/utils";

const mux: Mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
): Promise<NextResponse<unknown>> {
  try {
    const { userId }: { userId: string | null } = auth();
    checkAuthorization(!!userId);
    await checkOwnership(params.courseId, userId!);

    const _courseAssets = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId!,
      },
      include: {
        chapters: {
          include: {
            muxData: true
          }
        }
      }
    });
    checkExistingRecord(!!_courseAssets);    

    for (const chapter of _courseAssets!.chapters) {
      if (chapter.muxData?.assetId) {
        await mux.video.assets.delete(chapter.muxData.assetId);
      }
    }

    const _deletedCourse: Course = await db.course.delete({
      where: {
        id: params.courseId
      }
    });

    return NextResponse.json(_deletedCourse);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export async function PATCH(
    req: Request,
    { params }: { params: {courseId: string}}
): Promise<NextResponse<unknown>> {
  try {
    const { userId }: { userId: string | null } = auth();
    checkAuthorization(!!userId);
    await checkOwnership(params.courseId, userId!);

    const _values = await req.json();

    const _course: Course = await db.course.update({
        where: { 
            id: params.courseId,
            userId: userId!,
        },
        data: {
            ..._values,
      },
    });

    return NextResponse.json(_course);
  } catch (error) {
    console.log("[COURSE_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
