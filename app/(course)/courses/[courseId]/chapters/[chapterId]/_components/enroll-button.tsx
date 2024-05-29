"use client"

import axios, { AxiosResponse } from "axios";
import { useState } from "react";

import { formatPrice } from "@/lib/format";
import { getErrorMessage } from "@/app/(dashboard)/client-utils";

import { Button } from "@/components/ui/button";

export const CourseEnrollButton = ({
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

            const response: AxiosResponse<any, any> = await axios.post(
              `/api/courses/${courseId}/checkout`
            );
            window.location.assign(response.data.url);
        } catch (error) {
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
