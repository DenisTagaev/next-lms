"use client"

import { UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react"
import { getPathParams } from "../lib/custom-utils"
import Link from "next/link"

export const NavbarRoutes = () => {
    const path = usePathname();

    return (
        <div className="flex gap-x-3 ml-auto">
            {getPathParams(path).isTeacher || getPathParams(path).isPlayer ? (
                <Link href="/">
                   <Button size="sm" variant="outline">
                        <LogOut className="h-4 w-4 mr-2"/>
                            Logout
                   </Button>
                </Link>
            ):  <Link href="/teacher/courses">
                    <Button size="sm" variant="outline">
                        Teacher Page
                    </Button>
                </Link>
            }
            <UserButton
                afterSignOutUrl="/"
            />
        </div>
    )
}