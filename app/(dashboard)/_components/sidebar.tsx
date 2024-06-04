"use client"

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { BackButton } from "@/components/back-button";
import { SidebarRoutes } from "./sidebar-routes"
import { Logo } from "./logo"

export const Sidebar = (): JSX.Element => {
    const path = usePathname();
    
    useEffect(() => {
    }, [path]);
    
    return (
      <aside
        className="h-full border-r flex flex-col 
            overflow-y-auto bg-slate-200 dark:bg-slate-800 shadow-sm"
      >
        <div className="p-6">
          <Logo />
        </div>
        <div className="flex flex-col w-full">
          <SidebarRoutes />
          {path.includes("chapters") && (
            <BackButton path={`/teacher/courses/${path.split("/")[3]}`} platform="mobile" origin="course"/>
          )}
        </div>
      </aside>
    );
}