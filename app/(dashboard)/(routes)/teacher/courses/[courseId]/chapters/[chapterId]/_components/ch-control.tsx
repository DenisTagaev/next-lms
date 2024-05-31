"use client"

import axios from "axios"
import toast from "react-hot-toast"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { getErrorMessage } from "@/app/(dashboard)/client-utils"
import { IChapterControlProps } from "@/lib/interfaces"

import { Button } from "@/components/ui/button"
import { ConfirmationDialog } from "@/components/modals/confirm-modal"
import { Trash } from "lucide-react"

export const ChapterControl = ({
    disabled,
    courseId,
    chapterId,
    isPublished
}: IChapterControlProps): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false); 
    const router = useRouter(); 

    const onDelete = async(): Promise<void> => {
      try {
        setIsLoading(true);
        
        await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`)
        toast.success("Chapter successfully deleted!");
        
        router.push(`/teacher/courses/${courseId}`);
        router.refresh();
      } catch (error) {
        getErrorMessage(error);
      } finally {
        setIsLoading(false);
      }
    }

    const onPublish = async (): Promise<void> => {
      try {
        setIsLoading(true);

        if(isPublished) {
          await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`);
          toast.success("Chapter successfully unpublished!");
        } else{
          await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`);
          toast.success("Chapter successfully published!");
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