import { ICourseSidebarProps } from "@/lib/interfaces";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CourseSidebar } from "./course-sidebar";
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
        <CourseSidebar 
            course={course}
            progress={progress}
        />
      </SheetContent>
    </Sheet>
  );
};
