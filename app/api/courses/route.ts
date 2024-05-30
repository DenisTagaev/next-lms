import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Course } from "@prisma/client";
import { NextResponse } from "next/server";

import { checkAuthorization } from "@/app/api/courses/utils";

export async function POST(
    req: Request,
): Promise<NextResponse<unknown>> {
    try {
        const { userId }: { userId: string | null } = auth();
        checkAuthorization(!!userId);
        
        const { title } : { title: string } = await req.json();
        const _course: Course = await db.course.create({
            data: { 
                userId: userId!,
                title,
            }
        });

        return NextResponse.json(_course);
    } catch (error) {
        console.log("[COURSES]", error);
        return new NextResponse("Internal Error", { status: 500});
    }
}