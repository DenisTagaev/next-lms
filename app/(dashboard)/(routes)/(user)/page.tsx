import { auth } from "@clerk/nextjs/server";
import { checkExistence } from "@/app/(dashboard)/client-utils";
import { getDashboardCourses } from "@/actions/get-dashboard-info";

import { CoursesList } from "@/components/courses-list";
import { CheckCircle2Icon, Clock } from "lucide-react";
import { InfoCard } from "./_components/info-card";

export default async function Dashboard(
): Promise<JSX.Element> {
  const { userId }: { userId: string | null } = auth();
  checkExistence(!!userId);
  

  const {
    completedCourses,
    coursesInProgress,
  } = await getDashboardCourses(userId!);

  return (
    <section className="p-6 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle2Icon}
          label="Completed"
          numOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </section>
  );
}
