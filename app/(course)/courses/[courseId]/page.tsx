import { checkExistence } from "@/app/(dashboard)/client-utils";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function CourseIdPage({
  params,
}: { params: { courseId: string } }): Promise<JSX.Element> {
  
  const course = await db.course.findUnique({
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
  checkExistence(course);
  
  return redirect(`/courses/${course!.id}/chapters/${course!.chapters[0].id}`);
}
