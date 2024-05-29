"use client"

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { ICourseSidebarItemProps } from "@/lib/interfaces";

import { Lock, CheckCircle, PlayCircle } from "lucide-react";
import { useProgressStore } from "@/hooks/use-video-progress";
import { Progress } from "@/components/ui/progress";

export const CourseSidebarItem = ({
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
          `flex items-center gap-x-3 text-slate-600 text-nowrap 
                text-sm font-[500] pl-6 transition-all hover:text-sky-600
                hover:bg-slate-400/75`,
          isActiveChapter &&
            `text-sky-600 bg-slate-400/75 
                hover:text-sky-500 hover:bg-slate-300/75`,
          isCompleted &&
            `text-emerald-600 
                hover:bg-emerald-600 hover:text-white`,
          isCompleted && isActiveChapter && `bg-emerald-300/75`
        )}
      >
        <div className="flex items-center gap-x-2 py-3">
          <Icon size={24} />
          {label}
        </div>
        <Progress value={progress} variant="default" />
        <div
          className={cn(
            "ml-auto opacity-0 border-2 border-sky-600 h-full transition-all",
            isActiveChapter && "opacity-100",
            isCompleted && "border-emerald-600"
          )}
        />
      </button>
    );
};
