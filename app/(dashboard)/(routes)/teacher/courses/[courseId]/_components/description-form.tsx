"use client"
import * as zod from "zod";
import axios, { AxiosResponse } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { formDescriptionSchema } from "@/app/(dashboard)/_schemas/new-course";
import { getErrorMessage } from "@/app/(dashboard)/client-utils";
import { IDescriptionFormProps } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

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

    const form: UseFormReturn<zod.infer<typeof formDescriptionSchema>> = useForm<
      zod.infer<typeof formDescriptionSchema>
    >({
      resolver: zodResolver(formDescriptionSchema),
      defaultValues: {
        description: initialData?.description || ""
      }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (
      values: zod.infer<typeof formDescriptionSchema>
    ): Promise<void> => {
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
          <p className={cn(
            "text-sm mt-2",
            !initialData?.description && "text-slate-600 italic"
          )}>{initialData?.description || "No description yet"}</p>
        ) : (
          <Form {...form}>
            <form
              className="space-y-4 mt-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
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