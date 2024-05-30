import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { Attachment } from "@prisma/client";
import { Metadata } from "next";

import { getChapter } from "@/actions/get-chapter";
import { checkExistence } from "@/app/(dashboard)/client-utils";

import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/enroll-button";
import { CourseProgressButton } from "./_components/progress-button";
import { File } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: { courseId: string; chapterId: string };
}): Promise<Metadata> {
  const chapter: {
    title: string;
    description: string | null;
  } | null = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
    },
    select: {
      title: true,
      description: true
    },
  });

  return {
    title: chapter?.title ?? "Chapter Not Found",
    description: chapter?.description ?? "Chapter details and data page",
  };
}

export default async function ChapterIdPage({
  params
}: { 
    params: {courseId: string, chapterId: string }
}): Promise<JSX.Element> {
    const { userId }: { userId: string | null } = auth();
    checkExistence(userId);
    
    const{
        _chapter,
        _course,
        _muxData,
        _attachments,
        _nextChapter,
        _userProgression,
        _purchase
    } = await getChapter({
        userId: userId!,
        chapterId: params.chapterId,
        courseId: params.courseId
    });
    checkExistence(_chapter);
    checkExistence(_course);

    const isLocked: boolean = !_chapter?.isFree && !_purchase;
    const completeOnFinish: boolean =
      !!_purchase && !_userProgression?.isCompleted;
    

    return (
      <>
        {isLocked && (
          <Banner label="You need to purchase this course to view the chapter" />
        )}
        {_userProgression?.isCompleted && (
          <Banner variant="success" label="You have completed this chapter" />
        )}
        <div className="flex flex-col max-w-4xl mx-auto pb-20">
          <div className="p-4">
            <VideoPlayer
              chapterId={params.chapterId}
              title={_chapter!.title}
              courseId={params.courseId}
              nextChapterId={_nextChapter?.id}
              playbackId={_muxData?.playbackId!}
              isLocked={isLocked}
              completeOnFinish={completeOnFinish}
            />
          </div>
          <div>
            <div className="p-4 flex flex-col md:flex-row items-center justify-between">
              <h2 className="text-2xl font-semibold mb-2">{_chapter!.title}</h2>
              {_purchase ? (
                <CourseProgressButton
                    chapterId={params.chapterId}
                    courseId={params.courseId}
                    nextChapterId={_nextChapter?.id}
                    isCompleted={!!_userProgression?.isCompleted}
                />
              ) : (
                <CourseEnrollButton
                  courseId={params.courseId}
                  price={_course?.price!}
                />
              )}
            </div>
            <Separator />
            <Preview value={_chapter?.description!} />
            {!!_attachments?.length && (
              <>
                <Separator />
                <div className="p-4">
                    {_attachments?.map((attachment: Attachment): JSX.Element => (
                        <a
                            key={attachment.id}
                            href={attachment.url!}
                            target="_blank"
                            className="flex items-center p-3 w-full bg-sky-200
                                border text-sky-600 rounded-md hover:underline"
                        >
                            <File/>
                            <p className="line-clamp-1">
                                {attachment.name}
                            </p>
                        </a>
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
}
