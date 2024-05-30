"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";

import "react-quill/dist/quill.bubble.css";

import { IPreviewComponentProps } from "@/lib/interfaces";

export const Preview = ({ value }: IPreviewComponentProps): JSX.Element => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
      <ReactQuill theme="bubble" value={value} readOnly/>
  );
};
