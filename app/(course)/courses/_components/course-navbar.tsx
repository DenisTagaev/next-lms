import dynamic from "next/dynamic";

import { ICourseNavbarProps } from "@/lib/interfaces";

import { NavbarRoutes } from "@/components/navbar-routes";
import { BackButton } from "@/components/back-button";
const MobileSidebar = dynamic(() => 
  import("./course-mobile-sidebar").then(res => res.CourseMobileSidebar));

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
      <MobileSidebar course={course} progress={progress} />
      <NavbarRoutes />
    </div>
  );
};
