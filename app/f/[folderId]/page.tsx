import { notFound } from "next/navigation"
import { eq } from "drizzle-orm"
import { files as allFiles, folders as allFolders } from "@/server/schema"
import { FolderContentsWithBreadcrumbs } from "@/components/folder-contents-with-breadcrumbs"
import { db } from "@/server/db"

async function getFolderHierarchy(folderId: number) {
    const hierarchy = []
    let currentFolderId = folderId

    while (currentFolderId !== 0) {
        const folder = await db.select().from(allFolders).where(eq(allFolders.id, currentFolderId)).limit(1)
        if (folder.length === 0) break

        hierarchy.unshift(folder[0])
        currentFolderId = folder[0].parent ?? 0
    }

    return hierarchy
}

export default async function FolderPage({ params }: { params: Promise<{ folderId?: string }> }) {
    console.log("Received params:", params)

    const { folderId } = await params
    console.log("Received folderId:", folderId)
    if (!folderId) {
        console.error("Missing folderId in params")
        return notFound() // Show 404 page
    }

    const parsedFolderId = Number(folderId)
    console.log("Parsed folderId:", parsedFolderId)

    if (isNaN(parsedFolderId)) {
        return notFound()
    }

    const [folders, files, breadcrumbs] = await Promise.all([
        db.select().from(allFolders).where(eq(allFolders.parent, parsedFolderId)),
        db.select().from(allFiles).where(eq(allFiles.parent, parsedFolderId)),
        getFolderHierarchy(parsedFolderId),
    ])

    return (
        <FolderContentsWithBreadcrumbs
            files={files}
            folders={folders}
            currentFolder={parsedFolderId}
            breadcrumbs={breadcrumbs}
        />
    )
}


