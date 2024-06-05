"use client"

import { useMemo } from "react"
import dynamic from "next/dynamic"

import "react-quill/dist/quill.snow.css"

import { IEditorComponentProps } from "@/lib/interfaces"
import { useTheme } from "next-themes"

export const Editor= ({
    onChange,
    value
}: IEditorComponentProps): JSX.Element => {
    const { theme } = useTheme();

    const ReactQuill = useMemo(
        () => dynamic(
            () => import("react-quill"), { ssr: false}
        ), []
    );

    return (
      <div className="bg-slate-100 dark:bg-slate-900">
        <ReactQuill className={theme !== 'light' ? "dark": ""} theme="snow" value={value} onChange={onChange} />
      </div>
    );
}