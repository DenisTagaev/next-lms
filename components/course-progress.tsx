import { cn } from "@/lib/utils";

import { ICourseProgressProps } from "@/lib/interfaces";

import { Progress } from "@/components/ui/progress";

const courseVariance = {
    color: {
        default: "text-sky-600",
        success: "text-emerald-500",
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
}: ICourseProgressProps): JSX.Element => {
  return (
    <>
      <Progress className="h-2" value={value} variant={variant} />
      <p
        className={cn(
          "font-medium mt-2 text-sky-600",
          courseVariance.color[variant || "default"],
          courseVariance.size[size || "default"]
        )}
      >
        {Math.round(value)} % Complete
      </p>
    </>
  );
};
