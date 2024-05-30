"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ICategoryItemProps } from "@/lib/interfaces";
import { getSearchedUrl } from "@/lib/custom-utils";

export const CategoryItem = ({
    label,
    icon: Icon,
    value,
}: ICategoryItemProps): JSX.Element => {
    const _path = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const currCategoryId: string | null = searchParams.get('categoryId');
    const currTitle: string | null = searchParams.get("title");
    const hasSelectedCategory: boolean = currCategoryId === value;
    
    const onClick = (): void => {
        const url = getSearchedUrl(
            _path, 
            hasSelectedCategory ? null : value as string,
            currTitle, 
        );
        router.push(url);
    }

    return (
      <button
        onClick={onClick}
        className={cn(
          `text-sm font-medium border-2 border-sky-600 rounded-full
                py-2 px-3 flex items-center gap-x-1 transition
                hover:animate-border-rotate hover:bg-emerald-100`,
          hasSelectedCategory &&
            `text-sky-600 bg-slate-200/75 
                hover:text-sky-600 hover:bg-slate-200/75
                border-sky-600`
        )}
        type="button"
      >
        {Icon && <Icon size={20} />}
        <span className="truncate">{label}</span>
      </button>
    );
};
