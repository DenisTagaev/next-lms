import { IconBadge } from "@/components/icon-badge";
import { IInfoCardProps } from "@/lib/interfaces";

export const InfoCard = ({
    variant,
    icon,
    numOfItems,
    label
}: IInfoCardProps): JSX.Element => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto p-3 border rounded-md">
      <IconBadge
        variant={variant}
        icon={icon}
      />
      <div>
        <p className="font-bold">
            {label}
        </p>
        <p className={`italic ${variant === 'success' ? 'text-emerald-600' : 'text-sky-600'}`}>
            {numOfItems} {numOfItems === 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  );
};
