/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

"use server";

import { db } from "./db";
import { folders } from "./schema";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export async function createFolder(name: string, parent: number | null) {
  try {
    const user = await auth();
    if (!user.userId) {
      throw new Error("Unauthorized");
    }

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
