import { db } from "@/lib/db";

export const getProgress = async (
    userId: string,
    courseId: string,    
): Promise<number> => {
    try{
        const _publishedChapters: { id: string }[] = await db.chapter.findMany({
            where: {
                courseId,
                isPublished: true,
            },
            select: {
                id: true
            }
        });
        const _publishedChIds: string[]= _publishedChapters.map((chapter) => chapter.id);
        const _validCompletedChapters: number = await db.userProgression.count({
            where: {
                userId,
                chapterId: {
                    in: _publishedChIds
                },
                isCompleted: true
            }
        });

        return (_validCompletedChapters / _publishedChIds.length) * 100;
    } catch(error){
        console.log("GET_PROGRESS", error);
        return 0;
    }
}