"use client"
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { formDescriptionSchema } from "@/app/(dashboard)/_schemas/new-course";
import { getErrorMessage } from "@/app/(dashboard)/client-utils";
import { IDescriptionFormProps } from "@/lib/interfaces";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";


export const DescriptionForm = ({
    initialData,
    courseId
}: IDescriptionFormProps): JSX.Element => {
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

    const {
      isSubmitting,
      isValid,
    }: { isSubmitting: boolean; isValid: boolean } = _form.formState;

    const onSubmit = async (
      values: zod.infer<typeof formDescriptionSchema>
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
      <div className="p-4 mt-6 border bg-sky-300/50 dark:bg-sky-900/50 rounded-md">
        <div className="font-medium flex items-center justify-between">
          Course description
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
          <p
            className={cn(
              "text-sm mt-2",
              !initialData?.description &&
                "text-slate-600 dark:text-slate-400 italic"
            )}
          >
            {initialData?.description || "No description yet"}
          </p>
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
                      <Textarea
                        className="bg-slate-100 dark:bg-slate-900"
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