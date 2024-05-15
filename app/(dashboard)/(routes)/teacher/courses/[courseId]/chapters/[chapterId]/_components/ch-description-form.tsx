"use client"
import * as zod from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { formDescriptionSchema } from "@/app/(dashboard)/_schemas/new-course";
import { getErrorMessage } from "@/app/(dashboard)/client-utils";
import { IChDescriptionFormProps } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Editor } from "@/components/editor";
import { Pencil } from "lucide-react";
import { Preview } from "@/components/preview";


export const ChDescriptionForm = ({
    initialData,
    courseId,
    chapterId
}: IChDescriptionFormProps): JSX.Element => {
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = (): void => setIsEditing((current) => !current);
    
    const router = useRouter();

    const _form: UseFormReturn<zod.infer<typeof formDescriptionSchema>> = useForm<
      zod.infer<typeof formDescriptionSchema>
    >({
      resolver: zodResolver(formDescriptionSchema),
      defaultValues: {
        description: initialData?.description ?? ""
      }
    });

    const { isSubmitting, isValid } = _form.formState;

    const onSubmit = async (
      values: zod.infer<typeof formDescriptionSchema>
    ): Promise<void> => {
      try {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}`,
          values
        );
        toast.success("Chapter successfully updated!");
        toggleEdit();
        router.refresh();
      } catch (error) {
        getErrorMessage(error);
      }
    };

    return (
      <div className="p-4 mt-6 border bg-sky-300/50 rounded-md">
        <div className="font-medium flex items-center justify-between">
          Chapter description
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit description
              </>
            )}
          </Button>
        </div>
        {!isEditing ? (
          <div className={cn(
            "text-sm mt-2",
            !initialData.description && "text-slate-600 italic"
          )}>
            {!initialData.description && "No description yet"}
            {initialData.description && 
              <Preview
                value={initialData.description}
              />
            }
          </div>
        ) : (
          <Form {..._form}>
            <form
              className="space-y-4 mt-4"
              onSubmit={_form.handleSubmit(onSubmit)}
            >
              <FormField
                control={_form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Editor            
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Button
                  disabled={ !isValid || isSubmitting}
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    );
};