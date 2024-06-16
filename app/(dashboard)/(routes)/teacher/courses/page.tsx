import dynamic from "next/dynamic";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";

import { checkExistence } from "@/app/(dashboard)/client-utils";

const DataTable = dynamic(() => 
    import("./_components/data-table"),
    { ssr: false}
);

export function generateMetadata(): Metadata {
  const { userId }: { userId: string | null } = auth();
  checkExistence(userId);

  return {
    title: `Teacher Courses`,
    description: `Table of courses page created by ${userId}`,
  };
}

export default async function CoursesPage (): Promise<JSX.Element> {
    const { userId }: { userId: string | null } = auth();
    checkExistence(userId);

    const db = (await(import("@/lib/db"))).db;
    const _courses = await db.course.findMany({
        where: {
            userId: userId!,
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const columns = (await (import("./_components/columns"))).columns;   
    return (
        <div className="p-6">
            <DataTable columns={columns} data={_courses}/>
        </div>
    )
}