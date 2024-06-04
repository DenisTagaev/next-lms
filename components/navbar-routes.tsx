"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { UserButton } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

import { getPathParams } from "@/lib/custom-utils"

import { Button } from "@/components/ui/button"
import { SearchInput } from "@/components/search-input"
import { ModeToggle } from "@/components/mode-toggle"
import { LogOut } from "lucide-react"

export const NavbarRoutes = (): JSX.Element => {
    const path = usePathname();
    const { theme } = useTheme();

    return (
      <>
        {getPathParams(path).isSearch && (
          <div className="hidden md:block">
            <SearchInput />
          </div>
        )}
        <div className="flex gap-x-3 ml-auto">
          {getPathParams(path).isTeacher || getPathParams(path).isPlayer ? (
            <Link href="/">
              <Button size="sm" variant="outline">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </Link>
          ) : (
            <Link href="/teacher/courses">
              <Button size="sm" variant="outline">
                Teacher Page
              </Button>
            </Link>
          )}
          <ModeToggle />
          <UserButton
            appearance={{
              baseTheme: theme !== "light" ? dark : undefined,
            }}
            afterSignOutUrl="/"
          />
        </div>
      </>
    );
}