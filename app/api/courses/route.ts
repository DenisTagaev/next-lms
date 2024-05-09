import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Course } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
): Promise<NextResponse<unknown>> {
    try {
        const { userId }: { userId: string | null } = auth();
        
        if(!userId) {
            return new NextResponse("Unauthorized", { status: 401});
        }
        
        const { title } : { title: string } = await req.json();
        const course: Course = await db.course.create({
            data: { 
                userId,
                title,
            }
        });

        return NextResponse.json(course);
    } catch (error) {
        console.log("[COURSES]", error);
        return new NextResponse("Internal Error", { status: 500});
    }
}