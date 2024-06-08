"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ICourseProgressButtonProps } from "@/lib/interfaces";
import { useConfettiStore } from "@/hooks/use-confetti-store";

import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

const CourseProgressButton = ({
  courseId,
  chapterId,
  nextChapterId,
  isCompleted,
}: ICourseProgressButtonProps): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const confetti = useConfettiStore();
    
    const Icon = isCompleted ? XCircle : CheckCircle2;

    const onClick = async (): Promise<void> => {
        try {
            setIsLoading(true);

            const axios = (await import("axios")).default;
            await axios.put(
                `/api/courses/${courseId}/chapters/${chapterId}/progress`,
                {
                    isCompleted: !isCompleted,
                }
            );
            
            if(!isCompleted && !nextChapterId) {
                confetti.onOpen();
            }

            if(!isCompleted && nextChapterId) {
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
            }

            const toast = (await import("react-hot-toast")).default;
            toast.success("Your progress has been updated!");
            router.refresh();
        } catch (error) {
            const { getErrorMessage } = (await import("@/app/(dashboard)/client-utils"));
            getErrorMessage(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button 
            type="button"
            variant={isCompleted ? "outline" : "success"}
            className="w-full md:w-auto"
            onClick={onClick} 
            disabled={isLoading} 
            >
        {isCompleted ? "Mark uncompleted": "Mark completed"}
        <Icon className="h-4 w-4 ml-3"/>
        </Button>
    );
};

export default CourseProgressButton;