import Link from "next/link";

import { ICourseNavbarProps } from "@/lib/interfaces";

import { NavbarRoutes } from "@/components/navbar-routes";
import { CourseMobileSidebar } from "./course-mobile-sidebar";
import { ArrowLeft } from "lucide-react";

export const CourseNavbar = ({
  course,
  progress
}: ICourseNavbarProps): JSX.Element => {
  return (
    <div
      className="p-4 border-b h-full flex items-center
         bg-white shadow-sm"
    >
      <Link
        href={`/`}
        className="hidden md:flex items-center text-sm hover:opacity-75 transition"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to dashboard
      </Link>
      <CourseMobileSidebar course={course} progress={progress} />
      <NavbarRoutes />
    </div>
  );
};
