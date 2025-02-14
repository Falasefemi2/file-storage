/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

"use server";

import { db } from "./db";
import { folders } from "./schema";
import { revalidatePath } from "next/cache";

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
