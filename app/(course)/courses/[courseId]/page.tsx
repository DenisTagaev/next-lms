import { db } from "@/lib/db";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { checkExistence } from "@/app/(dashboard)/client-utils";

export async function generateMetadata({
  params,
}: {
  params: { courseId: string };
}): Promise<Metadata> {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    select: {
      title: true,
    },
  });

  return {
    title: course ? `Course: ${course.title}` : "Course Not Found",
  };
}

export async function generateStaticParams() {
  const courses = await db.course.findMany({
    select: {
      id: true,
    },
  });

  return courses.map((course) => ({
    courseId: course.id,
  }));
}

export default async function CourseIdPage({
  params,
}: { params: { courseId: string } }): Promise<JSX.Element> {
  
  const _course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });
  checkExistence(_course);
  
  return redirect(`/courses/${_course!.id}/chapters/${_course!.chapters[0].id}`);
}
