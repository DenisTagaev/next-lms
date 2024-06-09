"use client"

import { useState } from "react";

import { formatPrice } from "@/lib/custom-utils";

import { Button } from "@/components/ui/button";

const CourseEnrollButton = ({
    courseId,
    price
}: {
    courseId: string,
    price: number
}): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async(): Promise<void> => {
        try {
            setIsLoading(true);
            
            const axios = (await import("axios")).default;
            const response = await axios.post(
              `/api/courses/${courseId}/checkout`
            );
            window.location.assign(response.data.url);
        } catch (error) {
            const { getErrorMessage } = (await import("@/app/(dashboard)/client-utils"));
            getErrorMessage(error);
        } finally {
            setIsLoading(false);
        }
    }
  return (
    <Button 
        onClick={onClick} 
        disabled={isLoading}
        className="w-full md:w-auto"
    >
        Enroll for {formatPrice(price)}
    </Button>
  );
};

export default CourseEnrollButton;