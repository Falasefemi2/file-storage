/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from "react"
import Link from "next/link"
import FolderContents from "./folder-contents"
import type { InferSelectModel } from "drizzle-orm"
import type { files as allFiles, folders as allFolders } from "../server/schema"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon } from "lucide-react"
import { NewFolderDialog } from "./new-folder-dialog"
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";


type FileType = InferSelectModel<typeof allFiles>
type FolderType = InferSelectModel<typeof allFolders>

interface FolderContentWithBreadcrumbsProps {
    files: FileType[]
    folders: FolderType[]
    currentFolder: number
    breadcrumbs: FolderType[]
}

export function FolderContentsWithBreadcrumbs({
    files,
    folders,
    currentFolder,
    breadcrumbs,
}: FolderContentWithBreadcrumbsProps) {




    const handleUploadComplete = (res: any) => {
        console.log("Files: ", res);
        toast.success("Upload Completed");
    };

    const handleUploadError = (error: Error) => {
        toast.error(`ERROR! ${error.message}`);
    };
    return (
        <div className="min-h-screen p-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Google Drive Clone</h1>

                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-2">
                        <Link href={breadcrumbs.length > 1 ? `/f/${breadcrumbs[breadcrumbs.length - 2].id}` : "/"}>
                            <Button variant="outline" size="icon">
                                <ChevronLeftIcon className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div className="flex items-center space-x-2">
                            <Link href="/" className="hover:underline">
                                Root
                            </Link>
                            {breadcrumbs.map((folder) => (
                                <React.Fragment key={folder.id}>
                                    <span className="text-gray-400">/</span>
                                    <Link href={`/f/${folder.id}`} className="hover:underline">
                                        {folder.name}
                                    </Link>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={handleUploadComplete}
                            onUploadError={handleUploadError}
                        />
                        <NewFolderDialog currentFolder={currentFolder} />
                    </div>
                </div>

                <FolderContents files={files} folders={folders} currentFolder={currentFolder} />
            </div>
        </div>
    )
}

