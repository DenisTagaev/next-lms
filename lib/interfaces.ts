import { fileRouter } from "@/app/api/uploadthing/core";
import { Course } from "@prisma/client";
import { AxiosError, AxiosResponse } from "axios";
import { LucideIcon } from "lucide-react";

export interface ISidebarItemProps {
  icon: LucideIcon,
  label: string,
  href: string
}
export interface ICustomAxiosError<T = any> extends AxiosError {
  response?: AxiosResponse<T>;
}

export interface ITitleFormProps {
  initialData?: {
    title: string
  };
  courseId: string;
}

export interface IDescriptionFormProps {
  initialData?: Course
  courseId: string;
}
export interface IFileUploadProps {
  onChange: (url?: string) => void;
  endPoint: keyof typeof fileRouter;
}