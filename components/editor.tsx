"use client"

import { useMemo } from "react"
import dynamic from "next/dynamic"

import "react-quill/dist/quill.snow.css"

import { IEditorComponentProps } from "@/lib/interfaces"

export const Editor= ({
    onChange,
    value
}: IEditorComponentProps): JSX.Element => {
    const ReactQuill = useMemo(
        () => dynamic(
            () => import("react-quill"), { ssr: false}
        ), []
    );

    return(
        <div className="bg-white">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
            />
        </div>
    )
}