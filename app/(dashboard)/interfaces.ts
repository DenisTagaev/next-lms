import { AxiosError, AxiosResponse } from "axios";
import { LucideIcon } from "lucide-react";

export interface SidebarItemProps {
    icon: LucideIcon,
    label: string,
    href: string
}
export interface CustomAxiosError<T = any> extends AxiosError {
  response?: AxiosResponse<T>;
}