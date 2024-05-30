import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Attachment } from "@prisma/client";
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
    
    const { url }: { url: string } = await req.json();
    const _newFile: Attachment = await db.attachment.create({
      data: {
        url,
        name: url.split("/").pop() as string,
        courseId: params.courseId,
      },
    });

    return NextResponse.json(_newFile);
  } catch (error) {
    console.log("[COURSE_ID_ATTACHMENTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}