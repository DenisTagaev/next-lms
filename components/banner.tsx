import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority"

import { AlertTriangle, CheckCircleIcon } from "lucide-react";

interface BannerProps extends VariantProps<typeof bannerVariance> {
    label: string;
}

const bannerVariance = cva(
  "border text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        warning:
          "bg-yellow-200/90 border-yellow-30 text-primary dark:bg-yellow-800",
        success: `bg-emerald-600 dark:bg-emerald-800 
          border-emerald-800 dark:border-emerald-600 
          text-secondary dark:text-primary`,
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  }
);

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon
}

export const Banner = ({
  label,
  variant
}: BannerProps): JSX.Element => {
  const Icon = iconMap[variant ?? "warning"];

  return(
      <div className={cn(bannerVariance({variant: variant}))}>
          <Icon className="h-4 w-4 mr-2"/>
          {label}
      </div>
  )
}