"use client"

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

export const CourseEnrollButton = ({
    courseId,
    price
}: {
    courseId: string,
    price: number
}): JSX.Element => {
  return (
    <Button className="w-full md:w-auto">
        Enroll for {formatPrice(price)}
    </Button>
  );
};
