import { auth } from "@clerk/nextjs/server";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { checkAuthorization } from "@/app/api/courses/utils";
import { db } from "@/lib/db";


export default async function CoursesPage (): Promise<JSX.Element> {
    const { userId }: { userId: string | null } = auth();
    checkAuthorization(!!userId);

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