import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import qs from "query-string";
import toast from "react-hot-toast";

import { ICustomAxiosError } from "@/lib/interfaces";

export const getErrorMessage = (error: any): void => {
  if (error instanceof AxiosError) {
    (error as ICustomAxiosError).response?.data?.message
      ? toast.error((error as ICustomAxiosError)?.response?.data?.message)
      : toast.error((error as ICustomAxiosError)?.message);
  } else {
    toast.error("An unexpected error occurred.");
  }
};

export const checkExistence = (data: any): void => {
    if (!data) {
      return redirect("/");
    }
}

export const getSearchedUrl = (
  path: string,
  category: string | null, 
  title: string | null
): string => {
  const url: string = qs.stringifyUrl({
    url: path,
    query: {
      categoryId: category,
      title: title
    }
  }, { skipEmptyString: true, skipNull: true });
  return url;
} 