"use client"
import * as zod from "zod";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Attachment } from "@prisma/client";

import { getErrorMessage } from "@/app/(dashboard)/client-utils";
import { formAttachmentSchema } from "@/app/(dashboard)/_schemas/new-course";
import { IAttachmentFormProps } from "@/lib/interfaces";

import { Button } from "@/components/ui/button";
const FileUpload = dynamic(() => 
  import("@/components/file-upload").then(res => res.FileUpload));
import { PlusCircle, File, Loader2, X } from "lucide-react";


export const AttachmentForm = ({
    initialData,
    courseId
}: IAttachmentFormProps): JSX.Element => {
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = (): void => setIsEditing((current) => !current);
    
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const router = useRouter();

    const onSubmit = async (
      values: zod.infer<typeof formAttachmentSchema>
    ): Promise<void> => {
      try {
        const axios = (await import("axios")).default;
        await axios.post(
          `/api/courses/${courseId}/attachments`,
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

    const onDelete = async (id: string): Promise<void> => {
      try {
        setDeleteId(id);
        const axios = (await import("axios")).default;
        await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
        
        router.refresh();
        const toast = (await import("react-hot-toast")).default;
        toast.success("File deleted!");
      } catch (error) {
        getErrorMessage(error);
      } finally {
        setDeleteId(null);
      }
    }

    return (
      <div className="p-4 mt-6 border bg-sky-300/50 dark:bg-sky-900/50 rounded-md">
        <div className="font-medium flex items-center justify-between">
          Course attachments
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing && <>Cancel</>}
            {!isEditing && (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add new file
              </>
            )}
          </Button>
        </div>
        {!isEditing ? (
          <>
            {!initialData.attachments?.length ? (
              <p className="text-sm mt-2 text-slate-600 dark:text-slate-400 italic">
                No attachments were found
              </p>
            ) : (
              <ul className="space-y-2">
                {initialData.attachments?.map((file: Attachment) => (
                  <li
                    key={file.id}
                    className="flex items-center p-2 w-full bg-sky-100
                  border-sky-600 border rounded-sm"
                  >
                    <File className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="line-clamp-1">{file.name}</span>
                    {deleteId === file.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <button
                        onClick={(): Promise<void> => onDelete(file.id)}
                        className="ml-auto hover:text-destructive transition-all"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <>
            <FileUpload
              endPoint="courseAttachments"
              onChange={(url: string | undefined): void => {
                if (url) onSubmit({ url });
              }}
            />
            <div className="text-xs text-muted-foreground mt-4 italic">
              Files your students would require to complete the course
            </div>
          </>
        )}
      </div>
    );
};