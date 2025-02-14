/** @format */

import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { files } from "@/server/schema";
import { z } from "zod";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "16MB",
      maxFileCount: 10,
    },
    pdf: {
      maxFileSize: "1GB",
      maxFileCount: 10,
    },
    video: {
      maxFileSize: "1GB",
      maxFileCount: 10,
    },
    blob: {
      maxFileSize: "1GB",
      maxFileCount: 10,
    },
    text: {
      maxFileSize: "1GB",
      maxFileCount: 10,
    },
  })
    .input(z.object({ parentFolderId: z.number().default(0) }))
    .middleware(async ({ input }) => {
      const user = await auth();
      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.userId, parentFolderId: input.parentFolderId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      await db
        .insert(files)
        .values({
          name: file.name,
          size: file.size,
          url: file.url,
          parent: metadata.parentFolderId,
        })
        .execute();

      console.log("File inserted into the database:", file.name);

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
