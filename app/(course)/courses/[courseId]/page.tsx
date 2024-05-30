import { db } from "@/lib/db";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { checkExistence } from "@/app/(dashboard)/client-utils";

export async function generateMetadata({
  params,
}: {
  params: { courseId: string };
}): Promise<Metadata> {
  const course: {
    title: string;
    description: string | null
  } | null = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    select: {
      title: true,
      description: true
    },
  });

  return {
    title: course ? `${course.title}` : "Course Not Found",
    description: course?.description ?? "Course details and data page"
  };
}

export async function generateStaticParams() {
  const courses: {
    id: string;
  }[] = await db.course.findMany({
    select: {
      id: true,
    },
  });

  return courses.map(
    (course: {
      id: string;
    }): {
      courseId: string;
    } => ({
      courseId: course.id,
    })
  );
}

export default async function CourseIdPage({
  params,
}: {
  params: { courseId: string };
}): Promise<never> {
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

  return redirect(
    `/courses/${_course!.id}/chapters/${_course!.chapters[0].id}`
  );
}
