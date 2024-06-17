"use client"

import * as zod from "zod"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { UseFormReturn, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { formTitleSchema } from "@/app/(dashboard)/_schemas/new-course"

import { 
    Form, 
    FormControl, 
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage 
} from '@/components/ui/form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AddCourse(): JSX.Element {
    const router = useRouter();
    const _form: UseFormReturn<zod.infer<typeof formTitleSchema>> = 
        useForm<zod.infer<typeof formTitleSchema>>(
        {
            resolver: zodResolver(formTitleSchema),
            defaultValues: {
                title: "",
            },
        });

    const { isSubmitting, isValid }: { isSubmitting: boolean, isValid: boolean} = _form.formState;

    const onSubmit = async(values: zod.infer<typeof formTitleSchema>) => {
        try {
            const axios = (await import("axios")).default;
            const response = await axios.post("/api/courses", values);

            router.push(`/teacher/courses/${response.data.id}`);
            router.refresh();
            const toast = (await import("react-hot-toast")).default;
            toast.success("Course successfully created!");
        } catch (error) {
            const { getErrorMessage } = await import("@/app/(dashboard)/client-utils");
            getErrorMessage(error);
        }
    };

    return (
      <div className="pt-3">
        <h1 className="text-3xl">Enter the title for your course</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          How would you like to name your course? Don&apos;t worry, you can
          change this later.
        </p>
        <Form {..._form}>
          <form
            onSubmit={_form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={_form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Next.js 2024 full course'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    What would you like to teach in this course?
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/teacher/courses">
                <Button type="button" disabled={isSubmitting} variant="destructive">
                  Cancel
                </Button>
              </Link>
              <Button
                className="dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                type="submit"
                disabled={isSubmitting || !isValid}
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    );
}
