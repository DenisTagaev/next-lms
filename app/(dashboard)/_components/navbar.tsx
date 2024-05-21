import { MobileSidebar } from "./_mobile-view/mobile-sidebar"
import { NavbarRoutes } from "@/components/navbar-routes"

export const Navbar = (): JSX.Element => {
    return (
        <div className="p-4 border-b h-full flex items-center
         bg-white shadow-sm">
            <MobileSidebar/>
            <NavbarRoutes/>
        </div>
    )
}