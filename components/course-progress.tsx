import { cn } from "@/lib/utils";

import { ICourseProgressProps } from "@/lib/interfaces";

import { Progress } from "@/components/ui/progress";

const courseVariance = {
    color: {
        default: "text-sky-500",
        success: "text-emerald-400",
    },
    size: {
        default: "text-md",
        sm: "text-sm",
    },
};

export const CourseProgress = ({
  value,
  variant,
  size,
}: ICourseProgressProps) => {
  return (
    <div>
      <Progress className="h-2" value={value} variant={variant} />
      <p
        className={cn(
          "font-medium mt-2 text-sky-500",
          courseVariance.color[variant || "default"],
          courseVariance.size[size || "default"]
        )}
      >
        {Math.round(value)} % Complete
      </p>
    </div>
  );
};
