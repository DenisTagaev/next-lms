"use client"
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { formPriceSchema } from "@/app/(dashboard)/_schemas/new-course";
import { getErrorMessage } from "@/app/(dashboard)/client-utils";
import { formatPrice } from "@/lib/custom-utils";
import { IPriceFormProps } from "@/lib/interfaces";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";

export const PriceForm = ({
    initialData,
    courseId
}: IPriceFormProps): JSX.Element => {
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = (): void => setIsEditing((current) => !current);
    
    const router = useRouter();

    const _form: UseFormReturn<zod.infer<typeof formPriceSchema>> = useForm<
      zod.infer<typeof formPriceSchema>
    >({
      resolver: zodResolver(formPriceSchema),
      defaultValues: {
        price: initialData.price ?? undefined
      }
    });

    const {
      isSubmitting,
      isValid,
    }: { isSubmitting: boolean; isValid: boolean } = _form.formState;

    const onSubmit = async (
      values: zod.infer<typeof formPriceSchema>
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
          Course price
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit price
              </>
            )}
          </Button>
        </div>
        {!isEditing ? (
          <p
            className={cn(
              "text-sm mt-2",
              !initialData.price && "text-slate-600 dark:text-slate-400 italic"
            )}
          >
            {initialData.price
              ? formatPrice(initialData.price)
              : "No price yet"}
          </p>
        ) : (
          <Form {..._form}>
            <form
              className="space-y-4 mt-4"
              onSubmit={_form.handleSubmit(onSubmit)}
            >
              <FormField
                control={_form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        step={0.1}
                        min={0}
                        className="bg-slate-100 dark:bg-slate-900"
                        disabled={isSubmitting}
                        placeholder="Set a price for your course"
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