import { db } from "@/server/db"
import { folders as mockFolders, files as mockFiles } from "@/server/schema"
import FolderContents from "./folder-contents"
import FolderHeader from "./folder-header"
import { unstable_noStore as noStore } from 'next/cache';



export default async function DriveCloneContent() {
    noStore();
    const files = await db.select().from(mockFiles)
    const folders = await db.select().from(mockFolders)
    return (
        <div className="min-h-screen p-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">File Storage</h1>

                <div className="flex justify-between items-center mb-6">
                    <FolderHeader />
                </div>

                <FolderContents files={files} folders={folders} currentFolder={0} />
            </div>
        </div>
    )
}