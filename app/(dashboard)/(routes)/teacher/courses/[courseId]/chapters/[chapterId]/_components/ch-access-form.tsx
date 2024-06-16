"use client"
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { formAccessSchema } from "@/app/(dashboard)/_schemas/new-course";
import { getErrorMessage } from "@/app/(dashboard)/client-utils";
import { IChAccessFormProps } from "@/lib/interfaces";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil } from "lucide-react";


export const ChAccessForm = ({
    initialData,
    courseId,
    chapterId
}: IChAccessFormProps): JSX.Element => {
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = (): void => setIsEditing((current) => !current);
    
    const router = useRouter();

    const _form: UseFormReturn<zod.infer<typeof formAccessSchema>> = useForm<
      zod.infer<typeof formAccessSchema>
    >({
      resolver: zodResolver(formAccessSchema),
      defaultValues: {
        isFree: !!initialData.isFree
      }
    });

    const {
      isSubmitting,
      isValid,
    }: { isSubmitting: boolean; isValid: boolean } = _form.formState;

    const onSubmit = async (
      values: zod.infer<typeof formAccessSchema>
    ): Promise<void> => {
      try {
        const axios = (await import("axios")).default;
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}`,
          values
        );
        toggleEdit();

        router.refresh();
        const toast = (await import("react-hot-toast")).default;
        toast.success("Chapter successfully updated!");
      } catch (error) {
        getErrorMessage(error);
      }
    };

    return (
      <div className="p-4 mt-6 border bg-sky-300/50 dark:bg-sky-900/50 rounded-md">
        <div className="font-medium flex items-center justify-between">
          Chapter access
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Change access settings
              </>
            )}
          </Button>
        </div>
        {!isEditing ? (
          <p
            className={cn(
              "text-sm mt-2",
              !initialData.isFree && "text-slate-600 dark:text-slate-400 italic"
            )}
          >
            {initialData.isFree ? (
              <>Chapter is free for the preview</>
            ) : (
              <>Purchase full course to view this chapter</>
            )}
          </p>
        ) : (
          <Form {..._form}>
            <form
              className="space-y-4 mt-4"
              onSubmit={_form.handleSubmit(onSubmit)}
            >
              <FormField
                control={_form.control}
                name="isFree"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0 rounded-md border p-4 bg-slate-100 dark:bg-slate-900">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormDescription className="text-dark">
                        {initialData.isFree ? "Uncheck" : "Check"} the box to
                        make a free preview for the chapter
                      </FormDescription>
                    </div>
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