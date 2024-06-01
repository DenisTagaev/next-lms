"use client"

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { NavbarRoutes } from "@/components/navbar-routes";
import { BackButton } from "@/components/back-button";
import { MobileSidebar } from "./_mobile-view/mobile-sidebar";

export const Navbar = (): JSX.Element => {
    const path = usePathname();

    useEffect(() => {}, [path]);
    return (
      <div
        className="p-4 border-b h-full flex items-center
         bg-white shadow-sm"
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