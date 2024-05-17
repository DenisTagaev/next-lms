import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Chapter, Course } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";

import { checkExistence } from "@/app/(dashboard)/client-utils";

import { IconBadge } from "@/components/icon-badge";
import { ChTitleForm } from "./_components/ch-title-form";
import { Banner } from "@/components/banner";
import { ChDescriptionForm } from "./_components/ch-description-form";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import { ChAccessForm } from "./_components/ch-access-form";
import { ChVideoForm } from "./_components/ch-video-form";
import { ChapterControl } from "./_components/ch-control";

export default async function ChapterIdPage({
  params,
}: Readonly<{
  params: { courseId: string, chapterId: string};
}>): Promise<JSX.Element> {
  const { userId }: { userId: string | null } = auth();
  checkExistence(userId);

  const _course: Course | null = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId: userId!,
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  const _chapter: Chapter | null = await db.chapter.findUnique({
    where: {
        id: params.chapterId,
        courseId: params.courseId
    },
    include: {
        muxData: true
    }
  });
  
  checkExistence(_chapter);

  const _requiredFields = [
    _chapter!.title,
    _chapter!.description,
    _chapter!.videoUrl
  ];

  const completionStatus: string = `(${
    _requiredFields.filter(Boolean).length
  }/${_requiredFields.length})`;

  const _isComplete: boolean = _requiredFields.every(Boolean);

  return (
    <>
      {!_chapter!.isPublished && (
        <Banner
          label="Chapter is unpublished. It will not be visible to the public"
        />
      )}
      <section className="p-6 md:max-w-full">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-5"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to the course page
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h2 className="text-2xl font-medium">
                  Chapter {_chapter!.position + 1}
                </h2>
                <span>Complete all fields {completionStatus}</span>
              </div>
              <ChapterControl
                disabled={!_isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={_chapter!.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <IconBadge variant="success" icon={LayoutDashboard} />
              <h3 className="text-lg font-medium">Customize your chapter</h3>
            </div>
            <ChTitleForm
              initialData={_chapter!}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
            <ChDescriptionForm
              initialData={_chapter!}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Eye} />
              <h3 className="text-lg">Access Settings</h3>
            </div>
            <ChAccessForm
              initialData={_chapter!}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h3 className="text-lg">Add chapter video</h3>
            </div>
            <ChVideoForm
              initialData={_chapter!}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
        </div>
      </section>
    </>
  );
}
