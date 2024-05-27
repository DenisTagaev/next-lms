"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import { ICourseProgressButtonProps } from "@/lib/interfaces";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { getErrorMessage } from "@/app/(dashboard)/client-utils";

import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

export const CourseProgressButton = ({
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

            toast.success("Your progress has been updated!");
            router.refresh();
        } catch (error) {
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
