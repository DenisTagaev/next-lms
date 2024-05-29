"use client"

import { ChangeEvent, useEffect, useState } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

import { useDebounce } from "@/hooks/use-debounce"
import { getSearchedUrl } from "@/app/(dashboard)/client-utils"

import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

export const SearchInput = (): JSX.Element => {
    const [value, setValue] = useState("");
    const debouncedValue: string = useDebounce(value);
    
    const searchParams = useSearchParams();
    const router = useRouter();
    const _path: string = usePathname();
    const currCategoryId: string | null = searchParams.get("categoryId");

    useEffect((): void => {
      const url: string = getSearchedUrl(_path, currCategoryId, debouncedValue);
      setValue(debouncedValue);
      router.push(url);
    }, [debouncedValue, router, _path]);

    return (
      <div className="relative">
        <SearchIcon className="h-4 w-4 absolute top-2.5 left-3 text-slate-600" />
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>): void =>
            setValue(e.target.value)
          }
          value={value}
          className="w-full border-slate-200 placeholder:text-slate-600 
                    placeholder:font-medium md:w-[300px] pl-8 rounded-full
                    text-slate-600 focus-visible:ring-slate-600"
          placeholder="Course search"
        />
      </div>
    );
}