import { fileRouter } from "@/app/api/uploadthing/core";
import { Attachment, Chapter, Course, MuxData } from "@prisma/client";
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
  initialData: Course
  courseId: string;
}

export interface IFileUploadProps {
  onChange: (url?: string) => void;
  endPoint: keyof typeof fileRouter;
}

export interface ICategoryFormProps extends IDescriptionFormProps {
  options: { label: string; value: string; }[];
}

export interface IPriceFormProps extends IDescriptionFormProps {
}

export interface IAttachmentFormProps extends IDescriptionFormProps{
  initialData: Course & { attachments?: Attachment[] };
}

export interface IChapterFormProps  extends IDescriptionFormProps{
  initialData: Course & { chapters?: Chapter[] };
}

export interface IComboBoxProps {
  options: {
    label: string;
    value: string;
  }[];
  value?: string;
  onChange: (value: string) => void;
}

export interface IConfirmationModalProps{
  children: React.ReactNode;
  onConfirm: () => void;
}

export interface IPreviewComponentProps {
  value: string;
}

export interface IEditorComponentProps extends IPreviewComponentProps{
  onChange: (value: string) => void;
}

export interface IChapterListProps {
  items: Chapter[];
  onEdit: (id: string) => void;
  onReorder: (updateData: { id: string; position: number;}[]) => void;
}

export interface IChTitleFormProps extends ITitleFormProps {
  chapterId: string;
}

export interface IChDescriptionFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

export interface IChAccessFormProps extends IChDescriptionFormProps{
}

export interface IChVideoFormProps extends IChDescriptionFormProps{
  initialData: Chapter & { muxData?: MuxData | null};
}

export interface IChapterControlProps extends Omit<IChDescriptionFormProps, 'initialData'> {
  disabled: boolean;
  isPublished: boolean;
}

