"use client"
import * as zod from "zod";
import axios, { AxiosResponse } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { formCategorySchema } from "@/app/(dashboard)/_schemas/new-course";
import { getErrorMessage } from "@/app/(dashboard)/client-utils";
import { ICategoryFormProps } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";


export const CategoryForm = ({
    initialData,
    courseId,
    options
}: ICategoryFormProps): JSX.Element => {
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = (): void => setIsEditing((current) => !current);
    
    const router = useRouter();

    const _form: UseFormReturn<zod.infer<typeof formCategorySchema>> = useForm<
      zod.infer<typeof formCategorySchema>
    >({
      resolver: zodResolver(formCategorySchema),
      defaultValues: {
        categoryId: initialData?.categoryId || ""
      }
    });

    const _selectedCategory = options.find(
      option => option.value === initialData?.categoryId);

    const { isSubmitting, isValid } = _form.formState;

    const onSubmit = async (values: zod.infer<typeof formCategorySchema>) => {
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
          Course category
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit category
              </>
            )}
          </Button>
        </div>
        {!isEditing ? (
          <p className={cn(
            "text-sm mt-2",
            !initialData?.categoryId && "text-slate-600 italic"
          )}>
            {_selectedCategory?.label || "No category yet"}
          </p>
        ) : (
          <Form {..._form}>
            <form
              className="space-y-4 mt-4"
              onSubmit={_form.handleSubmit(onSubmit)}
            >
              <FormField
                control={_form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Combobox
                        options={options}
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