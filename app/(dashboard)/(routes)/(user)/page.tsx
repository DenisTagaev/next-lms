import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";

import { DashboardInfo, getDashboardCourses } from "@/actions/get-dashboard-info";
import { checkExistence } from "@/app/(dashboard)/client-utils";

import { CoursesList } from "@/components/courses-list";
import { InfoCard } from "./_components/info-card";
import { CheckCircle2Icon, Clock } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const { userId }: { userId: string | null } = auth();
  checkExistence(!!userId);

  return {
    title: "User Dashboard",
    description: `View ${userId}'s courses with progress and achievements`,
  };
}

export default async function Dashboard(
): Promise<JSX.Element> {
  const { userId }: { userId: string | null } = auth();
  checkExistence(!!userId);
  
  const {
    completedCourses,
    coursesInProgress,
  }: DashboardInfo = await getDashboardCourses(userId!);

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
