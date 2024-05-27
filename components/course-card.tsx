import Link from "next/link"

import { ICourseCardProps } from "@/lib/interfaces"
import { formatPrice } from "@/lib/format";

import Image from "next/image"
import { IconBadge } from "@/components/icon-badge";
import { CourseProgress } from "@/components/course-progress";
import { BookOpen } from "lucide-react";

export const CourseCard = ({
    id,
    title,
    imageUrl,
    chaptersLength,
    price,
    progress,
    category
}: ICourseCardProps): JSX.Element => {
    return (
      <Link href={`/courses/${id}`}>
        <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
          <div className="relative w-full aspect-video rounded-md overflow-hidden">
            <Image
              fill
              className="object-cover"
              alt="Course title image"
              src={imageUrl}
            />
          </div>
          <div className="flex flex-col pt-2">
            <p
              className="text-lg md:text-base font-medium group-hover:text-sky-600
                        transition line-clamp-2"
            >
              {title}
            </p>
            <p className="text-sm text-muted-foreground">{category}</p>
            <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
              <div className="flex items-center gap-x-1 text-slate-400">
                <IconBadge
                  variant={progress === 100 ? "success" : "default"}
                  size="sm"
                  icon={BookOpen}
                />
                <span className={`${progress === 100 ? 'text-emerald-600' : 'text-sky-600'} text-sm`}>
                  {chaptersLength}{" "}
                  {chaptersLength === 1 ? "Chapter" : "Chapters"}
                </span>
              </div>
            </div>
            {progress !== null ? (
              <CourseProgress
                value={progress}
                size="sm"
                variant={progress === 100 ? "success" : "default"}
              />
            ) : (
              <p className="text-md md:text-sm font-medium text-slate-900">
                {formatPrice(price)}
              </p>
            )}
          </div>
        </div>
      </Link>
    );
}