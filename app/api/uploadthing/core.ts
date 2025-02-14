/** @format */

// /** @format */

// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";
// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/server/db";
// import { files } from "@/server/schema";

// const f = createUploadthing();

// export const ourFileRouter = {
//   imageUploader: f({
//     image: {
//       maxFileSize: "4MB",
//       maxFileCount: 1,
//     },
//   })
//     .middleware(async () => {
//       const user = await auth();
//       if (!user) throw new UploadThingError("Unauthorized");

//       console.log("Metadata:", { userId: user.userId });

//       return { userId: user.userId, parentFolderId: 0 };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {
//       console.log("Upload complete for userId:", metadata.userId);

//       await db
//         .insert(files)
//         .values({
//           name: file.name,
//           size: file.size,
//           url: file.ufsUrl,
//           parent: metadata.parentFolderId,
//         })
//         .execute();

//       console.log("File inserted into the database:", file.name);

//       return { uploadedBy: metadata.userId };
//     }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;

/** @format */

import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { files, folders } from "@/server/schema";
import { eq } from "drizzle-orm";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth();
      if (!user) throw new UploadThingError("Unauthorized");

      const { parentFolderId } = await req.json(); // Get parentFolderId from the client

      // Check if the folder exists
      if (parentFolderId) {
        const existingFolder = await db
          .select()
          .from(folders)
          .where(eq(folders.id, parentFolderId))
          .execute();

        if (!existingFolder.length) {
          throw new UploadThingError("Invalid parent folder");
        }
      }

      console.log("Metadata:", { userId: user.userId, parentFolderId });

      return { userId: user.userId, parentFolderId: parentFolderId ?? 0 };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      await db
        .insert(files)
        .values({
          name: file.name,
          size: file.size,
          url: file.ufsUrl,
          parent: metadata.parentFolderId,
        })
        .execute();

      console.log("File inserted into the database:", file.name);

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
