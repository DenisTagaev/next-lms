"use client"
import * as zod from "zod";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";


import { getErrorMessage } from "@/app/(dashboard)/client-utils";
import { formVideoSchema } from "@/app/(dashboard)/_schemas/new-course";
import { IChVideoFormProps } from "@/lib/interfaces";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
const MuxPlayer = dynamic(() => import("@mux/mux-player-react"));
import { Pencil, PlusCircle, Video } from "lucide-react";


export const ChVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: IChVideoFormProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = (): void => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (
    values: zod.infer<typeof formVideoSchema>
  ): Promise<void> => {
    try {
      const axios = (await import("axios")).default;        
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toggleEdit();
      
      const toast = (await import("react-hot-toast")).default;
      toast.success("Chapter successfully updated!");
      router.refresh();
    } catch (error) {
      getErrorMessage(error);
    }
  };

  return (
    <div className="p-4 mt-6 border bg-sky-300/50 dark:bg-sky-900/50 rounded-md">
      <div className="font-medium flex items-center justify-between">
        Chapter Video
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add new video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Replace video
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        !initialData.videoUrl ? (
          <div
            className="flex items-center justify-center 
              h-60 bg-slate-200 dark:bg-slate-900 rounded-md"
          >
            <Video className="h-10 w-10 text-slate-600 dark:text-slate-400" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer
              playbackId={initialData?.muxData?.playbackId || ""}
              metadata={{
                video_id: initialData?.muxData?.assetId,
                video_title: `Chapter ${initialData?.position + 1} video`,
              }}
            />
          </div>
        )
      ) : (
        <>
          <FileUpload
            endPoint="chapterVideoAttachment"
            onChange={(url: string | undefined): void => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground dark:text-slate-400 mt-4">
            Add videos to this chapter
          </div>
        </>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground dark:text-slate-400 mt-2">
          Videos can take a few moments to process. Please, refresh the page if
          necessary
        </div>
      )}
    </div>
  );
};