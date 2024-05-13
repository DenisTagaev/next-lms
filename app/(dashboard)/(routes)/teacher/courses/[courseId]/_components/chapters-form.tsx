"use client"
import * as zod from "zod";
import axios, { AxiosResponse } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { formChapterSchema } from "@/app/(dashboard)/_schemas/new-course";
import { getErrorMessage } from "@/app/(dashboard)/client-utils";
import { IChapterFormProps } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";


export const ChapterForm = ({
    initialData,
    courseId
}: IChapterFormProps): JSX.Element => {
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const toggleCreating= (): void => setIsCreating((current) => !current);
    
    const router = useRouter();

    const form: UseFormReturn<zod.infer<typeof formChapterSchema>> = useForm<
      zod.infer<typeof formChapterSchema>
    >({
      resolver: zodResolver(formChapterSchema),
      defaultValues: {
        title: ""
      }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (
      values: zod.infer<typeof formChapterSchema>
    ): Promise<void> => {
      try {
        const response: AxiosResponse<any, any> = await axios.post(
          `/api/courses/${courseId}/chapters`,
          values
        );
        toast.success("Chapter successfully created!");
        toggleCreating();
        router.refresh();
      } catch (error) {
        getErrorMessage(error);
      }
    };

    return (
      <div className="p-4 mt-6 border bg-sky-300/50 rounded-md">
        <div className="font-medium flex items-center justify-between">
          Course chapters
          <Button onClick={toggleCreating} variant="ghost">
            {isCreating ? (
              <>Cancel</>
            ) : (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add a chapter
              </>
            )}
          </Button>
        </div>
        {isCreating && (
          <Form {...form}>
            <form
              className="space-y-4 mt-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="bg-slate-100"
                        disabled={isSubmitting}
                        placeholder="e.g. 'Introduction'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <Button
                  disabled={ !isValid || isSubmitting}
                  type="submit"
                >
                  Create
                </Button>
            </form>
          </Form>
        )}
        {!isCreating && (
          <>
            <p className={cn(
              "text-sm mt-2",
              !initialData.chapters?.length && "text-slate-500 italic"
            )}>
              {!initialData.chapters?.length && "No chapters"}
              {/* TODO: Add list of chapters */}
            </p>
            <p className="text-xs text-muted-foreground mt-3">Drag & Drop to reorder</p> 
          </>
        )}
      </div>
    );
};