"use client"

import { ICategoriesSearchProps } from "@/lib/interfaces";
import { Category } from "@prisma/client";

import {
    FcCommandLine,
    FcSportsMode,
    FcCamera,
    FcMusic,
    FcCalculator,
    FcBiotech,
} from "react-icons/fc"
import { IconType } from "react-icons/lib";
import { CategoryItem } from "./category-item";

const iconMap: Record<Category["name"], IconType> = {
    "Computer Science": FcCommandLine,
    "Fitness": FcSportsMode,
    "Photography": FcCamera,
    "Music": FcMusic,
    "Accounting": FcCalculator,
    "Medical Courses": FcBiotech,
}

export const Categories = ({
    items
}: ICategoriesSearchProps): JSX.Element => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
        {items.map((item) => (
            <CategoryItem
                key={item.id}
                label={item.name}
                icon={iconMap[item.name]}
                value={item.id}
            />
        ))}
    </div>
);
};