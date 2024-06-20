"use client"

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

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
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
    
    useEffect(() => {}, [path]);
    return (
      <div
        className={cn(
          `p-4 border-b h-full flex items-center
         bg-slate-100 dark:bg-black shadow-sm transition`,
         isScrolled && 'bg-slate-200/75 dark:bg-slate-800/75'
        )}
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