"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

import { ISidebarItemProps } from "@/lib/interfaces";

export const SidebarItem = ({
    icon: Icon,
    label,
    href
}: ISidebarItemProps): JSX.Element => {
    const _path = usePathname();
    const router = useRouter();

    const _isActiveRoute: boolean =
        (_path === '/' && href === '/') ||
        _path === href ||
        _path?.startsWith(`${href}/`);

    const onClick = (): void => router.push(href);

    return (
        <button 
            onClick={onClick}
            type="button"
            className={cn(
                `flex items-center gap-x-3 text-slate-600 text-nowrap 
                text-sm font-[500] pl-6 transition-all hover:text-sky-600
                hover:bg-slate-400/75`,
                _isActiveRoute && `text-sky-600 bg-slate-400/75 
                hover:text-sky-600 hover:bg-slate-400/75 border-r-4
                border-sky-600`
            )}
        >
            <div className="flex items-center gap-x-2 py-3">
                <Icon
                    size={22}
                    className={cn(
                        'text-slate-600',
                        _isActiveRoute && 'text-sky-600'
                    )}
                />
                {label}
            </div>
        </button>
    )
}