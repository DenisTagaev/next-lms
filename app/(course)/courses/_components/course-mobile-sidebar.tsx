import dynamic from "next/dynamic";
import { ComponentType } from "react";

import { ICourseSidebarProps } from "@/lib/interfaces";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
const Sidebar: ComponentType<ICourseSidebarProps> = dynamic(() =>
  import("./course-sidebar").then((res) => res.CourseSidebar)
);
import { Menu } from "lucide-react";

export const CourseMobileSidebar = ({
 course,
 progress   
}: ICourseSidebarProps): JSX.Element => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition-all">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72">
        <Sidebar 
            course={course}
            progress={progress}
        />
      </SheetContent>
    </Sheet>
  );
};
