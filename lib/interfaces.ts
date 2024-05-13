import { fileRouter } from "@/app/api/uploadthing/core";
import { Attachment, Chapter, Course } from "@prisma/client";
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

export interface ICategoryFormProps {
  initialData: Course;
  courseId: string;
  options: { label: string; value: string; }[];
}

export interface IPriceFormProps {
  initialData: Course;
  courseId: string;
}

export interface IAttachmentFormProps {
  initialData: Course & { attachments?: Attachment[] };
  courseId: string;
}

export interface IChapterFormProps {
  initialData: Course & { chapters?: Chapter[] };
  courseId: string;
}

export interface IComboBoxProps {
  options: {
    label: string;
    value: string;
  }[];
  value?: string;
  onChange: (value: string) => void;
}