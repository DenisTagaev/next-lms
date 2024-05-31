import { BackButton } from "@/components/back-button";
import { SidebarRoutes } from "./sidebar-routes"
import { Logo } from "./logo"

export const Sidebar = (): JSX.Element => {
    return (
      <aside
        className="h-full border-r flex flex-col 
            overflow-y-auto bg-slate-200 shadow-sm"
      >
        <div className="p-6">
          <Logo />
        </div>
        <div className="flex flex-col w-full">
          <SidebarRoutes />
          <BackButton path="/" platform="mobile" origin="dashboard" />
        </div>
      </aside>
    );
}