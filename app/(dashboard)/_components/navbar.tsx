"use client"

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { NavbarRoutes } from "@/components/navbar-routes";
const BackButton = dynamic(() =>
  import("@/components/back-button").then((res) => res.BackButton),
    { ssr: false }
);

const MobileSidebar = dynamic(() => 
    import("./_mobile-view/mobile-sidebar").then(res => res.MobileSidebar) 
);

export const Navbar = (): JSX.Element => {
    const path = usePathname();

    useEffect(() => {}, [path]);
    return (
      <div
        className="p-4 border-b h-full flex items-center
         bg-white dark:bg-slate-800/75 shadow-sm"
      >
        {path.includes("chapters") && (
          <BackButton
            path={`/teacher/courses/${path.split("/")[3]}`}
            origin="course"
          />
        )}
        <MobileSidebar />
        <NavbarRoutes />
      </div>
    );
}