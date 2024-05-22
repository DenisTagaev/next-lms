import { db } from "@/lib/db";
import { Attachment, Chapter, MuxData, Purchase } from "@prisma/client";


export const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: {
    userId: string;
    courseId: string;
    chapterId: string;
}) => {
  try {
    let _muxData: MuxData | null = null;
    let _attachments: Attachment[] = [];
    let _nextChapter: Chapter | null = null;

    const _purchase: Purchase | null = await db.purchase.findUnique({
        where: {
            userId_courseId: {
                userId,
                courseId,
            }
        }
    });

    const _course: {
      price: number | null;
    } | null = await db.course.findUnique({
      where: {
        id: courseId,
        isPublished: true,
      },
      select: {
        price: true,
      },
    });

    const _chapter: Chapter | null = await db.chapter.findUnique({
        where: {
            id: chapterId,
            isPublished: true,
        }
    });

    if(!_chapter || !_course) throw new Error(`Missing data`);

    if(_purchase || _chapter.isFree) {
        _attachments = await db.attachment.findMany({
            where: {
                courseId
            }
        });
        _muxData = await db.muxData.findUnique({
            where: {
                chapterId
            }
        });
        _nextChapter = await db.chapter.findFirst({
            where: {
                courseId,
                isPublished: true,
                position: {
                    gt: _chapter?.position
                }
            },
            orderBy: {
                position: "asc"
            }
        });
    }

    const _userProgression = await db.userProgression.findUnique({
        where: {
            userId_chapterId:{
                userId,
                chapterId
            },
        }
    });

    return {
      _chapter,
      _course,
      _muxData,
      _attachments,
      _nextChapter,
      _userProgression,
      _purchase,
    };

  } catch (error) {
    console.log("GET_CHAPTER", error);
    return {
        chapter: null,
        course: null,
        muxData: null,
        attachments: [],
        nextChapter: null,
        userProgression: null,
        purchase: null,
    };
  }
};
