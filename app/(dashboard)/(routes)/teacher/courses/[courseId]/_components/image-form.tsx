"use client"
import * as zod from "zod";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { getErrorMessage } from "@/app/(dashboard)/client-utils";
import { formImageSchema } from "@/app/(dashboard)/_schemas/new-course";
import { IDescriptionFormProps } from "@/lib/interfaces";

import Image  from "next/image"
import { Button } from "@/components/ui/button";
const FileUpload = dynamic(() => 
  import("@/components/file-upload").then(res => res.FileUpload));
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";

export const ImageForm = ({
    initialData,
    courseId
}: IDescriptionFormProps): JSX.Element => {
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = (): void => setIsEditing((current) => !current);
    
    const router = useRouter();

    const onSubmit = async (
      values: zod.infer<typeof formImageSchema>
    ): Promise<void> => {
      try {
        const axios = (await import("axios")).default;
        await axios.patch(
          `/api/courses/${courseId}`,
          values
        );
        toggleEdit();

        router.refresh();
        const toast = (await import("react-hot-toast")).default;
        toast.success("Course successfully edited!");
      } catch (error) {
        getErrorMessage(error);
      }
    };

    return (
      <div className="p-4 mt-6 border bg-sky-300/50 dark:bg-sky-900/50 rounded-md flex flex-col">
        <div className="font-medium flex items-center justify-between">
          Course image
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing && <>Cancel</>}
            {!isEditing && !initialData?.imageUrl && (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add image
              </>
            )}
            {!isEditing && initialData?.imageUrl && (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit image
              </>
            )}
          </Button>
        </div>
        {!isEditing ? (
          !initialData?.imageUrl ? (
            <div
              className="flex items-center justify-center 
              h-60 bg-slate-200 dark:bg-slate-900 rounded-md flex-grow"
            >
              <ImageIcon className="h-10 w-10 text-slate-500" />
            </div>
          ) : (
            <div className="relative aspect-video mt-2 flex-grow">
              <Image
                alt="Upload image zone"
                fill
                className="object-cover rounded-md"
                src={initialData.imageUrl}
              />
            </div>
          )
        ) : (
          <>
            <FileUpload
              endPoint="courseImage"
              onChange={(url: string | undefined): void => {
                if (url) {
                  onSubmit({ imageUrl: url });
                }
              }}
            />
            <div className="text-xs text-muted-foreground mt-4">
              16:9 aspect ratio recommended
            </div>
          </>
        )}
      </div>
    );
};