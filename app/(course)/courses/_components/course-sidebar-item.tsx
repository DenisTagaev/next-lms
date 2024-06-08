"use client"

import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { ICourseSidebarItemProps } from "@/lib/interfaces";

import { useProgressStore } from "@/hooks/use-video-progress";
const Progress = dynamic(() => 
  import("@/components/ui/progress").then(res => res.Progress));
import { Lock, CheckCircle, PlayCircle } from "lucide-react";

const CourseSidebarItem = ({
  id,
  label,
  isCompleted,
  courseId,
  isLocked,
}: ICourseSidebarItemProps): JSX.Element => {
    const progress = useProgressStore((state) => state.progress);

    const _path = usePathname();
    const router = useRouter();

    const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle);
    const isActiveChapter: boolean  = _path?.includes(id);

    const onClick = (): void => {
        router.push(`/courses/${courseId}/chapters/${id}`);
    }

    return (
      <button
        onClick={onClick}
        type="button"
        className={cn(
          `flex items-center gap-x-3 text-nowrap 
          text-slate-600 dark:text-slate-200
          text-sm font-[500] pl-6 transition-all 
          hover:text-sky-600 dark:hover:text-sky-600
          hover:bg-slate-400/75 dark:hover:bg-slate-700
          dark:bg-slate-800`,
          isActiveChapter &&
            `text-sky-600 dark:text-sky-600
             bg-slate-400/75 dark:bg-slate-700 
             hover:text-sky-500 dark:hover:text-sky-500
             hover:bg-slate-300/75 dark:hover:bg-slate-600/75`,
          isCompleted &&
            `text-emerald-600 dark:text-emerald-600
             hover:bg-emerald-600 dark:hover:bg-emerald-800
             hover:text-white dark:hover:text-white 
            `,
          isCompleted && isActiveChapter && 
            `bg-emerald-300/75 dark:bg-emerald-700 dark:text-emerald-300`
        )}
      >
        <div className="flex items-center gap-x-2 py-3">
          <Icon size={24} />
          {label}
        </div>
        <Progress value={progress} variant={isCompleted? "default": "success"}/>
        <div
          className={cn(
            "ml-auto opacity-0 border-2 border-sky-600 h-full transition-all",
            isActiveChapter && "opacity-100",
            isCompleted && "border-emerald-600 dark:border-emerald-800"
          )}
        />
      </button>
    );
};

export default CourseSidebarItem;