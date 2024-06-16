import { ICoursesListProps } from "@/lib/interfaces";

import { CourseCard } from "@/components/course-card";

export const CoursesList = ({ items }: ICoursesListProps): JSX.Element => {
  return (
    <section className="mt-4">
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 list-none p-0">
        {items.map((item) => (
          <li key={item.id}>
            <CourseCard
              id={item.id}
              title={item.title}
              imageUrl={item.imageUrl!}
              chaptersLength={item.chapters.length}
              price={item.price!}
              progress={item.progress}
              category={item?.category?.name!}
            />
          </li>
        ))}
      </ul>
      {items.length === 0 && (
        <p className="text-center text-xl text-muted-foreground mt-12">
          No available courses found
        </p>
      )}
    </section>
  );
};
