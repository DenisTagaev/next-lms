import { db } from "@/lib/db";
import { Category, Course } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

import { getCourses } from "@/actions/get-courses";
import { ISearchPageProps } from "@/lib/interfaces";

import { Categories } from "./_components/categories";
import { CoursesList } from "@/components/courses-list";
import { SearchInput } from "../../_components/search-input";
import { checkExistence } from "@/app/(dashboard)/client-utils";

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

  const _courses: Course[] = await getCourses({
    userId: userId!,
    ...searchParams
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
