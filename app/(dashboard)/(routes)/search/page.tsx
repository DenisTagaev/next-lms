import { db } from "@/lib/db";
import { Category, Course } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

import { getCourses } from "@/actions/get-courses";
import { checkAuthorization } from "@/app/api/courses/utils";
import { ISearchPageProps } from "@/lib/interfaces";

import { Categories } from "./_components/categories";
import { CoursesList } from "@/components/courses-list";
import { SearchInput } from "../../_components/search-input";

export default async function SearchPage({
  searchParams
}: ISearchPageProps): Promise<JSX.Element> {
  const { userId }: { userId: string | null } = auth();
  checkAuthorization(!!userId);

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
