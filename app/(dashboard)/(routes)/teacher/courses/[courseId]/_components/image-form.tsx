"use client"
import * as zod from "zod";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { getErrorMessage } from "@/app/(dashboard)/client-utils";
import { formImageSchema } from "@/app/(dashboard)/_schemas/new-course";
import { IDescriptionFormProps } from "@/lib/interfaces";

import Image  from "next/image"
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { FileUpload } from "@/components/file-upload";


export const ImageForm = ({
    initialData,
    courseId
}: IDescriptionFormProps): JSX.Element => {
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = (): void => setIsEditing((current) => !current);
    
    const router = useRouter();

    const onSubmit = async (values: zod.infer<typeof formImageSchema>) => {
      try {
        const response: AxiosResponse<any, any> = await axios.patch(
          `/api/courses/${courseId}`,
          values
        );
        toast.success("Course successfully edited!");
        toggleEdit();
        router.refresh();
      } catch (error) {
        getErrorMessage(error);
      }
    };

    return (
      <div className="p-4 mt-6 border bg-sky-300/50 rounded-md">
        <div className="font-medium flex items-center justify-between">
          Course image
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing && (
              <>Cancel</>
            )}
            {!isEditing && !initialData?.imageUrl &&(
              <>
                <PlusCircle className="h-4 w-4 mr-2"/>
                Add image
              </>
            )}
            {!isEditing && initialData?.imageUrl &&(
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit image
              </>
            )}
          </Button>
        </div>
        {!isEditing ? (
          !initialData?.imageUrl ? (
            <div className="flex items-center justify-center 
              h-60 bg-slate-200 rounded-md">
                <ImageIcon className="h-10 w-10 text-slate-500"/>
            </div>
          ) : (
            <div className="relative aspect-video mt-2">
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
              onChange={(url) => {
                if (url) {
                  onSubmit({ imageUrl: url });
                }
              }}
            />
          </>
        )}
      </div>
    );
};