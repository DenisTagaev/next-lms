import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Attachment } from "@prisma/client";
import { NextResponse } from "next/server";
import { checkAuthorization, checkOwnership } from "../../../utils";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string, attachmentId: string} }
): Promise<NextResponse<unknown>> {
  try {
    const { userId }: { userId: string | null } = auth();
    
    checkAuthorization(!!userId);
    await checkOwnership(params.courseId, userId!);   

    const attachment: Attachment = await db.attachment.delete({
      where:{
        courseId: params.courseId,
        id: params.attachmentId
      }
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("[ATTACHMENT_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
