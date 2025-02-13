/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

"use server";

import { mockFiles, mockFolders } from "@/components/mock-data";
import { db } from "./db";
import { files, folders } from "./schema";
import { revalidatePath } from "next/cache";

export default async function Seed() {
  console.log("Seeding data...");

  const filteredFiles = mockFiles.map(({ id, ...rest }) => rest);
  const file = await db.insert(files).values(filteredFiles);

  const filteredFolders = mockFolders.map(({ id, ...rest }) => rest);
  const folder = await db.insert(folders).values(filteredFolders);

  console.log({ file, folder });
}

export async function createFolder(name: string, parent: number | null) {
  try {
    if (!name) {
      throw new Error("Folder name is required");
    }

    const [newFolder] = await db
      .insert(folders)
      .values({ name, parent })
      .returning(); // Return the created folder

    revalidatePath("/");

    return { success: true, folder: newFolder };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}
