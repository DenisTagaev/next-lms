import { CourseWithCategoryProgress } from "@/actions/get-courses";
import { fileRouter } from "@/app/api/uploadthing/core";
import { Attachment, Category, Chapter, Course, MuxData, UserProgression } from "@prisma/client";
import { AxiosError, AxiosResponse } from "axios";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

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

export interface ICourseControlProps{
  disabled: boolean;
  courseId: string;
  isPublished: boolean | null;
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

export interface IChapterControlProps extends ICourseControlProps {
  chapterId: string;
}

export interface ICategoriesSearchProps {
  items: Category[];
}

export interface ICategoryItemProps {
  label: string;
  icon?: IconType;
  value?: string;
}

export interface ISearchPageProps {
  searchParams: {
    title: string;
    categoryId: string
  }
}

export interface ICoursesListProps {
  items: CourseWithCategoryProgress[];
}

export interface ICourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
}

export interface ICourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgression: UserProgression[] | null
    })[]
  };
  progress: number;
}

export interface ICourseNavbarProps extends ICourseSidebarProps{}

export interface ICourseSidebarItemProps {
  id: string;
  label: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}

export interface ICourseVideoPlayerProps {
  chapterId: string;
  title: string;
  courseId: string;
  nextChapterId?: string;
  playbackId: string;
  isLocked: boolean;
  completeOnFinish: boolean;
}