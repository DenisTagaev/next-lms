import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Chapter, Course } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";

import { checkExistence } from "@/app/(dashboard)/client-utils";

import { IconBadge } from "@/components/icon-badge";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import { ChTitleForm } from "./_components/ch-title-form";

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

  return (
    <section className="p-6 md:max-w-full">
      <div className="flex items-center justify-between">
        <div className="w-full">
            <Link
                href={`/teacher/courses/${params.courseId}`}
                className="flex items-center text-sm hover:opacity-75 transition mb-5"
            >
                <ArrowLeft className="w-4 h-4 mr-2"/>
                Back to the course page
            </Link>
            <div className="flex items-center justify-between w-full">
                <div className="flex flex-col gap-y-2">
                    <h2 className="text-2xl font-medium">Chapter Edit</h2>
                    <span>Complete all fields {completionStatus}</span>
                </div>
            </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div className="space-y-4">
            <div className="flex items-center gap-x-2">
                <IconBadge variant="success" icon={LayoutDashboard} />
                <h3 className="text-xl">Customize your chapter</h3>
            </div>
            <ChTitleForm
                initialData={_chapter!}
                courseId={params.courseId}
                chapterId={params.chapterId}
            />
        </div>
      </div>
    </section>
  );
}
