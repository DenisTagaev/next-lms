"use client";
import * as zod from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { formTitleSchema } from "@/app/(dashboard)/_schemas/new-course";
import { getErrorMessage } from "@/app/(dashboard)/client-utils";
import { IChTitleFormProps } from "@/lib/interfaces";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export const ChTitleForm = ({
  initialData,
  courseId,
  chapterId,
}: IChTitleFormProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = (): void => setIsEditing((current) => !current);

  const router = useRouter();

  const _form: UseFormReturn<zod.infer<typeof formTitleSchema>> = useForm<
    zod.infer<typeof formTitleSchema>
  >({
    resolver: zodResolver(formTitleSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = _form.formState;

  const onSubmit = async (
    values: zod.infer<typeof formTitleSchema>
  ): Promise<void> => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success("Chapter successfully edited!");
      toggleEdit();
      router.refresh();
    } catch (error) {
      getErrorMessage(error);
    }
  };

  return (
    <div className="p-4 mt-6 border bg-sky-300/50 rounded-md">
      <div className="font-medium flex items-center justify-between">
        Chapter Title
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <p className="text-sm mt-2">{initialData?.title}</p>
      ) : (
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
                      placeholder="e.g. 'Intro'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
