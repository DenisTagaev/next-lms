import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";

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