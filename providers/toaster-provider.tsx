"use client"

import { Toaster } from "react-hot-toast"

export const ToastProvider = (): JSX.Element => {
    return (
      <Toaster
        gutter={20}
        toastOptions={{
          success: {
            className: "dark:bg-emerald-800 dark:text-slate-200",
          },
          error: {
            className: "dark:bg-red-800 dark:text-slate-200",
          },
        }}
      />
    );
}