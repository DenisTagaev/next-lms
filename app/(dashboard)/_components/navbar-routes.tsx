"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs"

import { getPathParams } from "@/lib/custom-utils"

import { Button } from "@/components/ui/button"
import { SearchInput } from "./search-input"
import { LogOut } from "lucide-react"

export const NavbarRoutes = (): JSX.Element => {
    const _path = usePathname();

    return (
        <>
            {getPathParams(_path).isSearch && (
                <div className="hidden md:block">
                    <SearchInput/>
                </div>
            )}
            <div className="flex gap-x-3 ml-auto">
                {getPathParams(_path).isTeacher || getPathParams(_path).isPlayer ? (
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
        </>
    )
}