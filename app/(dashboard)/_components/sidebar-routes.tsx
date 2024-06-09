"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import { getPathParams } from "@/lib/custom-utils";

import { BarChart, Layout, List, Search } from "lucide-react";
const SidebarItem = dynamic(()=> import("./sidebar-item").then(res => res.SidebarItem), { ssr: false });


const _guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/",
    },
    {
        icon: Search,
        label: "Browse",
        href: "/search",
    }
]

const _teacherRoutes = [
    {
        icon: List,
        label: "Courses",
        href: "/teacher/courses",
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/teacher/analytics",
    },
]

export const SidebarRoutes = (): JSX.Element => {
    const path = usePathname();
    const routes = getPathParams(path).isTeacher ? 
        _teacherRoutes : _guestRoutes;

    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))
            }
        </div>
    )
}