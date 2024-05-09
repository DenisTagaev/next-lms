import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Course } from "@prisma/client";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";

import { checkExistence } from "@/app/(dashboard)/client-utils";

import { IconBadge } from "@/components/icon-badge";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";

export default async function CourseIdPage({
    params
}: Readonly<{
    params: { courseId: string}
}>) {
    const { userId }: { userId: string | null } = auth();
    checkExistence(userId);

    const course: Course | null = await db.course.findUnique({
        where: { 
            id: params.courseId
        }
    });
    
    if (!course) {
      return redirect("/");
    }

    const requiredFields: (string | number | null)[] = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId
    ]
    const completionStatus: string = 
        `(${requiredFields.filter(Boolean).length}/${requiredFields.length})`

    return (
        <section className="p-6 md:max-w-full">
        <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-2">
                <h2 className="text-2xl font-semibold">
                    Course content
                </h2>
                <span className="text-sm text-slate-600">
                    Complete all fields {completionStatus}
                </span>
            </div>
        </div>
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div className="flex items-center gap-x-2">
                    <IconBadge variant="success" icon={LayoutDashboard}/>
                    <h3 className="text-xl">
                        Customize your course
                    </h3>
                </div>
                <TitleForm
                    initialData={course}
                    courseId={course.id}
                />
                <DescriptionForm
                    initialData={course}
                    courseId={course.id}
                />
                <ImageForm
                    initialData={course}
                    courseId={course.id}
                />
            </div>
        </div>
        </section>
    );
}
