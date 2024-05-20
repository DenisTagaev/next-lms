import { db } from "@/lib/db";

export const getProgress = async (
    userId: string,
    courseId: string,    
): Promise<number> => {
    try{
        const publishedChapters: { id: string }[] = await db.chapter.findMany({
            where: {
                courseId,
                isPublished: true,
            },
            select: {
                id: true
            }
        });
        const publishedChIds: string[]= publishedChapters.map((chapter) => chapter.id);
        const validCompletedChapters: number = await db.userProgression.count({
            where: {
                userId,
                chapterId: {
                    in: publishedChIds
                },
                isCompleted: true
            }
        });

        return (validCompletedChapters / publishedChIds.length) * 100;
    } catch(error){
        console.log("GET_PROGRESS", error);
        return 0;
    }
}