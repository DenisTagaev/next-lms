"use client"

import * as zod from "zod"
import axios, { AxiosResponse } from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { UseFormReturn, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

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
import { formSchema } from "@/app/(dashboard)/_schemas/new-course"
import { getErrorMessage } from "@/app/(dashboard)/client-utils"
import toast from "react-hot-toast"

export default function AddCourse() {
    const router: AppRouterInstance = useRouter();
    const form: UseFormReturn<zod.infer<typeof formSchema>> = 
        useForm<zod.infer<typeof formSchema>>(
        {
            resolver: zodResolver(formSchema),
            defaultValues: {
                title: "",
            },
        });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async(values: zod.infer<typeof formSchema>) => {
        try {
            const response: AxiosResponse<any, any> = await axios.post("/api/courses", values);
            router.push(`/teacher/courses/${response.data.id}`);
            toast.success("Course successfully created!");
        } catch (error) {
            getErrorMessage(error);
        }
    };

    return (
      <div
        className="max-w-5xl min-w-[476px] lg:mx-auto flex lg:items-center 
        md:justify-center h-full p-6"
      >
        <div>
          <h1 className="text-3xl">Enter the title for your course</h1>
          <p className="text-sm text-slate-600">
            How would you like to name your course? Don&apos;t worry, you can
            change this later.
          </p>
          <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 mt-8"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Course title
                            </FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isSubmitting}
                                    placeholder="e.g. 'Next.js 2024 full course'"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                What would you like to teach in this course?
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <div className="flex items-center gap-x-2">
                    <Link href="/">
                        <Button
                            type="button"
                            variant="destructive"
                        >
                            Cancel
                        </Button>
                    </Link>
                    <Button
                        type="submit"
                        disabled={isSubmitting || !isValid}
                    >
                        Continue
                    </Button>
                </div>
            </form>
          </Form>
        </div>
      </div>
    );
}
