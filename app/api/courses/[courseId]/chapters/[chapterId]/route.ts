import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Chapter, MuxData } from "@prisma/client";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

import { checkAuthorization, checkExistingRecord, checkOwnership, check_and_updateVoidCourse } from "../../../utils";

const mux: Mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});


export async function DELETE(
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
      },
    });
    checkExistingRecord(!!_chapter);

    if(_chapter!.videoUrl) {
      const muxData: MuxData | null = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        }
      });
      
      if(muxData) {
        await mux.video.assets.delete(muxData.assetId);
        await db.muxData.delete({
          where: {
            id: muxData.id
          }
        });
      }
    }

    const _deletedChapter: Chapter = await db.chapter.delete({
      where: {
        id: params.chapterId
      }
    });
    await check_and_updateVoidCourse(params.courseId);

    return NextResponse.json(_deletedChapter);
  } catch (error) {
    console.log("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string, chapterId: string} }
): Promise<NextResponse<unknown>> {
  try {
    const { userId }: { userId: string | null } = auth();
    checkAuthorization(!!userId);
    await checkOwnership(params.courseId, userId!);

    const { isPublished, ...values } = await req.json();

    const _chapter: Chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    });

    if(values.videoUrl) {
      const existingVideo: MuxData | null = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });

      /* Use this piece to replace the existing video*/
      if (existingVideo) {
        await mux.video.assets.delete(existingVideo.assetId);
        await db.muxData.delete({
          where: {
            id: existingVideo.id,
          },
        });
      }

      /* Use this piece to upload and save reference for the new video*/
      const asset: Mux.Video.Assets.Asset = await mux.video.assets.create({
        input: values.videoUrl,
        playback_policy: ["public"],
        encoding_tier: "baseline",
        test: false,
      });

      await db.muxData.create({
        data: {
          chapterId: params.chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }

    return NextResponse.json(_chapter);
  } catch (error) {
    console.log("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
