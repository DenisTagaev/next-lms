import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

import { checkExistence } from "@/app/(dashboard)/client-utils";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

export default async function CoursesPage (): Promise<JSX.Element> {
    const { userId }: { userId: string | null } = auth();
    checkExistence(userId);

    const _courses = await db.course.findMany({
        where: {
            userId: userId!,
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    
    return (
        <div className="p-6">
            <DataTable columns={columns} data={_courses}/>
        </div>
    )
}