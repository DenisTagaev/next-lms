import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const checkAuthorization = (param: boolean) => {
    if (!param) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
}

export const checkOwnership = async(param: string, id: string) => {
    const isCourseOwner: boolean = (await db.course.findUnique({
      where: {
        id: param,
        userId: id,
      },
    }))
      ? true
      : false;

    checkAuthorization(isCourseOwner);
}