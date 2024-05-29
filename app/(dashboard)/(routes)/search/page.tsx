import { db } from "@/lib/db";
import { Category, Course } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

import { CourseWithCategoryProgress, getCourses } from "@/actions/get-courses";
import { ISearchPageProps } from "@/lib/interfaces";
import { checkExistence } from "@/app/(dashboard)/client-utils";

import { Categories } from "./_components/categories";
import { CoursesList } from "@/components/courses-list";
import { SearchInput } from "../../_components/search-input";

export async function generateStaticParams() {
  const categories: Category[] = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return categories.map((category) => ({
    searchParams: { category: category.id },
  }));
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
