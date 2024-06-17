"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { getErrorMessage } from "@/app/(dashboard)/client-utils"
import { ICourseControlProps } from "@/lib/interfaces"
import { useConfettiStore } from "@/hooks/use-confetti-store"

import { Button } from "@/components/ui/button"
import { ConfirmationDialog } from "@/components/modals/confirm-modal"
import { Trash } from "lucide-react"

export const CourseControl = ({
    disabled,
    courseId,
    isPublished
}: ICourseControlProps): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false); 
    const router = useRouter(); 
    const congrats = useConfettiStore();

    const onDelete = async(): Promise<void> => {
      try {
        setIsLoading(true);
        const axios = (await import("axios")).default;
        await axios.delete(`/api/courses/${courseId}`)
        
        router.push(`/teacher/courses`);
        router.refresh();
        const toast = (await import("react-hot-toast")).default;
        toast.success("Course successfully deleted!");
      } catch (error) {
        getErrorMessage(error);
      } finally {
        setIsLoading(false);
      }
    }

    const onPublish = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const axios = (await import("axios")).default;
        const toast = (await import("react-hot-toast")).default;

        if(isPublished) {
          await axios.patch(`/api/courses/${courseId}/unpublish`);
          toast.success("Course successfully unpublished!");
        } else{
          await axios.patch(`/api/courses/${courseId}/publish`);
          toast.success("Course successfully published!");
          congrats.onOpen();
        }

        router.refresh();
      } catch (error) {
        getErrorMessage(error);
      } finally {
        setIsLoading(false);
      }
    }

    return (
      <div className="flex items-center gap-x-2">
        <Button
            onClick={onPublish}
            className="border border-slate-800"
            disabled={disabled || isLoading}
            variant="outline"
        >{isPublished ? "Unpublish" : "Publish"}</Button>
        <ConfirmationDialog onConfirm={onDelete}>
          <Button 
            variant="destructive"
            className="hover:text-slate-800"
            disabled={isLoading}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </ConfirmationDialog>
      </div>
    );
}