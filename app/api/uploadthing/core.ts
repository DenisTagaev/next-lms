import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const getAuth = () => {
  const { userId }: { userId: string | null } = auth();

  if(!userId) throw new UploadThingError("Unauthorized");;
  return { userId };
}

export const fileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => getAuth())
    .onUploadComplete(() => {}),
  courseAttachments: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => getAuth())
    .onUploadComplete(() => {}),
  chapterVideoAttachment: f({ video: { maxFileCount: 1, maxFileSize: "32GB" } })
    .middleware(() => getAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type fileRouter = typeof fileRouter;
