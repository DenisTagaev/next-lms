import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

import { LucideIcon } from "lucide-react";

const backgroundVariance = cva(
  "rounded-full flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-sky-500 dark:bg-sky-900",
        success: "bg-emerald-300 dark:bg-emerald-800",
      },
      size: {
        default: "p-2",
        sm: "p-1.5"
      }
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    }
  }
);

const iconVariance= cva(
    "",
    {
        variants: {
            variant: {
                default: "text-slate-700 dark:text-slate-200",
                success: "text-emerald-600 dark:text-emerald-400",
            },
            size: {
                default: "h-8 w-8",
                sm: "h-4 w-4"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        }
    }
);

type BackgroundVariantProps = VariantProps<typeof backgroundVariance>;
type IconVariantProps = VariantProps<typeof iconVariance>

interface IconBadgeProps extends BackgroundVariantProps, IconVariantProps {
    icon: LucideIcon
}

export const IconBadge = ({ 
    icon: Icon,
    variant,
    size
}: IconBadgeProps): JSX.Element => {
    return (
        <div className={cn(backgroundVariance({ variant, size}))}>
            <Icon className={cn(iconVariance({ variant, size}))}/>
        </div>
    )
}