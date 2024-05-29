import { db } from "@/lib/db";
import { Category, Course } from "@prisma/client";

import { getProgress } from "@/actions/get-progress";

export type CourseWithCategoryProgress = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
}

type GetCourses = {
    userId: string;
    title?: string;
    categoryId?: string
}

export const getCourses = async ({
    userId,
    title,
    categoryId
}: GetCourses): Promise<CourseWithCategoryProgress[]> => {
    try {
        const _courses = await db.course.findMany({
            where: {
                isPublished: true,
                title: {
                    contains: title
                },
                categoryId
            },
            include: {
                category: true,
                chapters: {
                    where: {
                        isPublished: true
                    },
                    select: {
                        id: true
                    }
                },
                purchases: {
                    where: {
                        userId
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        const _coursesWithProgress: CourseWithCategoryProgress[] = await Promise.all(
            _courses.map(async course => {
                
                if(course.purchases.length === 0) {
                    return { 
                        ...course,
                        progress: null
                    }
                }

                const progress: number = await getProgress(userId, course.id);

                return {
                    ...course,
                    progress
                }
            })
        );

        return _coursesWithProgress;
    } catch (error) {
        console.log("GET_COURSES", error);
        return [];
    }
}