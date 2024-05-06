"use client";

import { Compass, Layout, Search } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
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

export const SidebarRoutes = () => {
    return (
        <div className="flex flex-col w-full">
            {guestRoutes.map((route) => (
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