"use client";

import { ClientUploadedFileData } from "uploadthing/types";

import { UploadDropzone } from "@/lib/uploadthing";
import { IFileUploadProps } from "@/lib/interfaces";

export const FileUpload = ({ 
    onChange,
    endPoint
}: IFileUploadProps): JSX.Element => {
  return (
    <UploadDropzone
      endpoint={endPoint}
      className="
        bg-slate-700 ut-label:text-lg 
        ut-label:text-sky-300 ut-label:ut-uploading:text-emerald-400
        ut-allowed-content:text-white 
        ut-button:ut-readying:bg-red-500/50"
      onClientUploadComplete={(res: ClientUploadedFileData<null>[]) => {
        onChange(res?.[0].url);
      }}
      onUploadError={async(error) => {
        const toast = (await import("react-hot-toast")).default;
        toast.error(`${error?.message}`);
      }}
    />
  );
};