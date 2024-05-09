import { Logo } from "./logo"
import { SidebarRoutes } from "./sidebar-routes"

export const Sidebar = (): JSX.Element => {
    return (
        <aside className="h-full border-r flex flex-col 
            overflow-y-auto bg-slate-200 shadow-sm">
            <div className="p-6">
                <Logo/>
            </div>
            <div className="flex flex-col w-full">
                <SidebarRoutes/>
            </div>
        </aside>
    )
}