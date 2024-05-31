import Link from "next/link";
import { headers } from "next/headers";

import { getPathParams } from "@/lib/custom-utils";

import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./_mobile-view/mobile-sidebar";
import { ArrowLeft } from "lucide-react";
import { BackButton } from "@/components/back-button";

export const Navbar = (): JSX.Element => {
    const path = headers().get("referer") ?? "";

    return (
      <div
        className="p-4 border-b h-full flex items-center
         bg-white shadow-sm"
      >
        {getPathParams("/" + path.split("/")[3]).isTeacher &&
          getPathParams("/" + path.split("/")[4]).isPlayer && (
            <BackButton path={path.split("/")[5]} origin="dashboard"/>
          )}
        <MobileSidebar />
        <NavbarRoutes />
      </div>
    );
}