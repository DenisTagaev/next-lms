import { db } from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client";
import { getProgress } from "@/actions/get-progress";

type UserInfoCourse = Course & {
    category: Category;
    chapters: Chapter[];
    progress: number | null;
}

type DashboardInfo = {
  completedCourses: UserInfoCourse[];
  coursesInProgress: UserInfoCourse[];
};

export const getDashboardCourses = async(
    userId: string,
): Promise<DashboardInfo> => {
    try {
        const _dbCourses = await db.purchase.findMany({
            where: {
                userId,
            },
            select: {
                course: {
                    include: {
                        category: true,
                        chapters: {
                            where: {
                                isPublished: true,
                            }
                        }
                    }
                }
            }
        });

        const _purchasedCourses = _dbCourses.map(
          (purchase) => purchase.course
        ) as UserInfoCourse[];

        for (const course of _purchasedCourses) {
            const progress: number = await getProgress(userId, course.id);
            course["progress"] = progress;
        }

        const _completedCourses: UserInfoCourse[] = _purchasedCourses.filter(
          (c) => c.progress === 100
        );
        const _uncompletedCourses: UserInfoCourse[] = _purchasedCourses.filter(
          (c) => (c.progress ?? 0) < 100
        );

        return {
          completedCourses: _completedCourses,
          coursesInProgress: _uncompletedCourses,
        };
    } catch (error) {
        console.log("GET_DASHBOARD_INFO", error);
        return {
            completedCourses: [],
            coursesInProgress: [],
        }
    }
}