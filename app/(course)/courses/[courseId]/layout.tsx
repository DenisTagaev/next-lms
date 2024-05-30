import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";

import { checkExistence } from "@/app/(dashboard)/client-utils";
import { getProgress } from "@/actions/get-progress";

import { CourseSidebar } from "../_components/course-sidebar";
import { CourseNavbar } from "../_components/course-navbar";

export async function generateMetadata({
  params,
}: {
  params: { courseId: string };
}): Promise<Metadata> {
  const course: {
    title: string;
    description: string | null;
  } | null = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    select: {
      title: true,
      description: true,
    },
  });
  checkExistence(course);

  return {
    title: course?.title
      ? `${course.title}`
      : "Course Not Found",
    description: course?.description ?? "Course details and progress Page",
  };
}

const CourseLayout = async ({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { courseId: string }
}>) => {
    const { userId }: { userId: string | null } = auth();
    checkExistence(userId);
    
    const _course = await db.course.findUnique({
        where: {
            id: params.courseId
        },
        include: {
            chapters: {
                where: {
                    isPublished: true
                },
                include: {
                    userProgress: {
                        where: {
                            userId: userId!
                        }
                    }
                },
                orderBy: {
                    position: "asc"
                }
            }
        }
    });
    checkExistence(_course);

    const courseProgress: number = await getProgress(userId!, _course!.id);
    
    return (
      <>
        <nav className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
          <CourseNavbar course={_course!} progress={courseProgress} />
        </nav>
        <aside className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
          <CourseSidebar course={_course!} progress={courseProgress} />
        </aside>
        <section className="h-full pt-[80px] md:pl-80">{children}</section>
      </>
    );
}

export default CourseLayout;
