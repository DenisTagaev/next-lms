"use client"
import * as zod from "zod";
import toast from "react-hot-toast";
import axios, { AxiosResponse } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";
import { cn } from "@/lib/utils";

import { formChapterSchema } from "@/app/(dashboard)/_schemas/new-course";
import { getErrorMessage } from "@/app/(dashboard)/client-utils";
import { IChapterFormProps } from "@/lib/interfaces";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChaptersList } from "./chapters-list";
import { Loader2, PlusCircle } from "lucide-react";


export const ChapterForm = ({
    initialData,
    courseId
}: IChapterFormProps): JSX.Element => {
    const [chapters, setChapters] = useState(initialData.chapters ?? []);
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const toggleCreating= (): void => setIsCreating((current) => !current);
    
    const router = useRouter();

    const _form: UseFormReturn<zod.infer<typeof formChapterSchema>> = useForm<
      zod.infer<typeof formChapterSchema>
    >({
      resolver: zodResolver(formChapterSchema),
      defaultValues: {
        title: ""
      }
    });

    const {
      isSubmitting,
      isValid,
    }: { isSubmitting: boolean; isValid: boolean } = _form.formState;

    const onSubmit = async (
      values: zod.infer<typeof formChapterSchema>
    ): Promise<void> => {
      try {
        const response: AxiosResponse<any, any> = await axios.post(
          `/api/courses/${courseId}/chapters`,
          values
        );
        const newChapter: Chapter = response.data;

        setChapters((prevChapters) => {
          const updatedChapters = [...prevChapters, newChapter];
          return updatedChapters;
        });

        toast.success("Chapter successfully created!");
        toggleCreating();
      } catch (error) {
        getErrorMessage(error);
      }
    };

    const onReorder = async (updateData: { 
      id: string, 
      position: number 
    }[]): Promise<void> => {
      try {
        setIsEditing(true);

        await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
          list: updateData
        });
        toast.success("Chapters reordered");

        router.refresh();
      } catch (error) {
        getErrorMessage(error);
      } finally {
        setIsEditing(false);
      }
    }

    const onEdit = (id: string): void => {
      router.push(`/teacher/courses/${courseId}/chapters/${id}`)
    }

    return (
      <div className="relative p-4 mt-6 border bg-sky-300/50 rounded-md">
        {isEditing && (
          <div className="absolute h-full w-full bg-slate-500/60 top-0 right-0 rounded-md flex items-center justify-center">
            <Loader2 className="animate-spin h-7 w-7 text-sky-500"/>
          </div>
        )}
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
          <Form {..._form}>
            <form
              className="space-y-4 mt-4"
              onSubmit={_form.handleSubmit(onSubmit)}
            >
              <FormField
                control={_form.control}
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
            <div className={cn(
              "text-sm mt-2",
              !chapters?.length && "text-slate-500 italic"
            )}>
              {!chapters?.length && "No chapters"}
              <ChaptersList
                onEdit={onEdit}
                onReorder={onReorder}
                items={chapters}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3">Drag & Drop to reorder</p> 
          </>
        )}
      </div>
    );
};