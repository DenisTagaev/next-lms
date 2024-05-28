import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";

type PurchasedCourse = Purchase & {
    course: Course;
}

const groupByCourse = (
  purchases: PurchasedCourse[]
): {
  [courseTitle: string]: number;
} => {
  const _grouped: { [courseTitle: string]: number } = {};

  purchases.forEach((purchase: PurchasedCourse): void => {
    const courseTitle: string = purchase.course.title;

    if (!_grouped[courseTitle]) {
      _grouped[courseTitle] = 0;
    }
    _grouped[courseTitle] += purchase.course.price!;
  });

  return _grouped;
};

export const getAnalytics = async (
  userId: string
): Promise<{
  data: {
    name: string;
    total: number;
  }[];
  totalRevenue: number;
  totalSales: number;
}> => {
  try {
    const _purchases: PurchasedCourse[] | null = await db.purchase.findMany({
      where: {
        course: {
          userId,
        },
      },
      include: {
        course: true,
      },
    });

    if (!_purchases) {
      return {
        data: [],
        totalRevenue: 0,
        totalSales: 0,
      };
    }

    const _groupedRevenue: {
      [courseTitle: string]: number;
    } = groupByCourse(_purchases);
    const _data: {
      name: string;
      total: number;
    }[] = Object.entries(_groupedRevenue).map(([courseTitle, total]) => ({
      name: courseTitle,
      total,
    }));
    const _totalRevenue: number = _data.reduce((acc, curr) => acc + curr.total, 0);

    return {
      data: _data,
      totalRevenue: _totalRevenue,
      totalSales: _purchases.length,
    };
  } catch (error) {
    console.log("GET_ANALYTICS", error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }
};