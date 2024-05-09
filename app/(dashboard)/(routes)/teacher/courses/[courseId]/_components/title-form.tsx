"use client"
import * as zod from "zod";
import axios, { AxiosResponse } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { formTitleSchema } from "@/app/(dashboard)/_schemas/new-course";
import { ITitleFormProps } from "@/lib/interfaces";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { getErrorMessage } from "@/app/(dashboard)/client-utils";


export const TitleForm = ({
    initialData,
    courseId
}: ITitleFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current) => !current);
    
    const router = useRouter();

    const form: UseFormReturn<zod.infer<typeof formTitleSchema>> = useForm<
      zod.infer<typeof formTitleSchema>
    >({
      resolver: zodResolver(formTitleSchema),
      defaultValues: initialData
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: zod.infer<typeof formTitleSchema>) => {
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
          Course Title
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
                        placeholder="e.g. 'Next.js 2024 full course'"
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