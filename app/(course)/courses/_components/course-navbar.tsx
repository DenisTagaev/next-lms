import { ICourseNavbarProps } from "@/lib/interfaces";

import { NavbarRoutes } from "@/components/navbar-routes";
import { BackButton } from "@/components/back-button";
import { CourseMobileSidebar } from "./course-mobile-sidebar";

export const CourseNavbar = ({
  course,
  progress
}: ICourseNavbarProps): JSX.Element => {
  return (
    <div
      className="p-4 border-b h-full flex items-center
         bg-white shadow-sm dark:bg-slate-800/75"
    >
      <BackButton path="/" origin="dashboard"/>
      <CourseMobileSidebar course={course} progress={progress} />
      <NavbarRoutes />
    </div>
  );
};
