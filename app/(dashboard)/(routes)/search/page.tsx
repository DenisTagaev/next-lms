import dynamic from "next/dynamic";
import { db } from "@/lib/db";
import { Category } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

import { CourseWithCategoryProgress, getCourses } from "@/actions/get-courses";
import { ISearchPageProps } from "@/lib/interfaces";
import { checkExistence } from "@/app/(dashboard)/client-utils";

import { SearchInput } from "@/components/search-input";
import { Categories } from "./_components/categories";
const  CoursesList = dynamic(() => 
  import("@/components/courses-list").then(res => res.CoursesList)
);

export async function generateStaticParams() {
  const exampleCourseTitles: {
    title: string;
  }[] = await db.course.findMany({
    select: {
      title: true,
    },
    take: 10,
  });

  const courseTitleParams: {
    searchParams: {
      search: string;
    };
  }[] = exampleCourseTitles.map((course) => ({
    searchParams: {
      search: course.title,
    },
  }));

  return courseTitleParams;
}

export async function generateMetadata() {
  return {
    title: "Search Page",
    description: "Search page for courses by category or course title",
  };
}

export default async function SearchPage({
  searchParams
}: Readonly<ISearchPageProps>): Promise<JSX.Element> {
  const { userId }: { userId: string | null } = auth();
  checkExistence(userId);

  const _categories: Category[] = await db.category.findMany({ 
    orderBy: {
      name: "asc"
    }
  });

  const _courses: CourseWithCategoryProgress[] = await getCourses({
    userId: userId!,
    ...searchParams,
  });
  
  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput/>
      </div>
      <div className="p-6 space-y-4">
        <Categories
          items={_categories!}
        />
        <CoursesList items={_courses!}/>
      </div>
    </>
  )
}
