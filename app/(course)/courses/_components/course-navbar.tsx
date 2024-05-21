import { ICourseNavbarProps } from "@/lib/interfaces";

import { NavbarRoutes } from "@/components/navbar-routes";
import { CourseMobileSidebar } from "./course-mobile-sidebar";

export const CourseNavbar = ({
  course,
  progress
}: ICourseNavbarProps): JSX.Element => {
  return (
      <div
        className="p-4 border-b h-full flex items-center
         bg-white shadow-sm"
      >
        <CourseMobileSidebar 
            course={course}
            progress={progress}
        />
        <NavbarRoutes />
      </div>
  );
};
