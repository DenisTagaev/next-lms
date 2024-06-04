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
          `flex items-center gap-x-3 text-nowrap 
                text-sm font-[500] pl-6 transition-all 
                text-slate-600 dark:text-slate-200 
                hover:text-sky-600 dark:hover:text-sky-600
                hover:bg-slate-400/75 dark:hover:bg-slate-700`,
          _isActiveRoute &&
            `text-sky-600 dark:text-sky-600
                bg-slate-400/75 dark:bg-slate-700
                hover:text-sky-500 dark:hover:text-sky-500 
                hover:bg-slate-400/75 dark:hover:bg-slate-600/75
                border-sky-600 border-r-4`
        )}
      >
        <div className="flex items-center gap-x-2 py-3">
          <Icon
            size={22}
            className={cn("text-slate-600 dark:text-slate-200",
                _isActiveRoute && 
                "text-sky-600 dark:text-sky-600")}
          />
          {label}
        </div>
      </button>
    );
}