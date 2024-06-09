import dynamic from "next/dynamic";

import { 
    Sheet,
    SheetContent,
    SheetTrigger 
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
const Sidebar = dynamic(() => 
    import("../sidebar").then(res => res.Sidebar), 
    { ssr: false }
);

export const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition-all">
                <Menu/>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-white w-72">
                <Sidebar/>
            </SheetContent>
        </Sheet>
    )
} 