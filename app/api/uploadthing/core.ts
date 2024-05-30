import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const file = createUploadthing();

const getAuth = (): {
  userId: string;
} => {
  const { userId }: { userId: string | null } = auth();
  if(!userId) throw new UploadThingError("Unauthorized");

  return { userId };
}

export const fileRouter = {
  courseImage: file({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => getAuth())
    .onUploadComplete(() => {}),
  courseAttachments: file(["text", "image", "video", "audio", "pdf"])
    .middleware(() => getAuth())
    .onUploadComplete(() => {}),
  chapterVideoAttachment: file({ video: { maxFileCount: 1, maxFileSize: "256MB" } })
    .middleware(() => getAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type fileRouter = typeof fileRouter;
