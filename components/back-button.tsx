import { ArrowLeft } from "lucide-react";

import Link from "next/link";
export const BackButton = ({ 
    path,
    platform,
    origin
}: { 
    path: string; 
    origin: string; 
    platform?: "mobile" | null;  
}): JSX.Element => {
    return (
      <Link
        href={`/teacher/courses/${path}`}
        className={
          `items-center text-sm hover:opacity-75 transition` + platform
            ? "hidden md:flex"
            : "flex md:hidden"
        }
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {origin === "course" && "Back to the course page"}
        {origin === "dashboard" && "Back to dashboard"}
      </Link>
    );
}