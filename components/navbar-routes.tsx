"use client"

import { UserButton } from "@clerk/nextjs"

export const NavbarRoutes = () => {
    return (
        <div className="flex gap-x-3 ml-auto">
            <UserButton
                afterSignOutUrl="/"
            />
        </div>
    )
}