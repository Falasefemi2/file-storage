/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { NewFolderDialog } from "./new-folder-dialog"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { UploadButton } from "@/utils/uploadthing"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function FolderHeader() {
    const router = useRouter()
    const currentFolder = 0

    const handleUploadComplete = (res: any) => {
        console.log("Files: ", res)
        toast.success("Upload Completed")
        router.refresh()
    }

    const handleUploadError = (error: Error) => {
        console.error("Upload error:", error)
        toast.error(`ERROR! ${error.message}`)
    }

    return (
        <header className="flex items-center justify-between p-4 flex-wrap gap-4">
            <div className="order-1">
                <SignedOut>
                    <SignInButton mode="modal">
                        <Button variant="outline">Sign In</Button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: "w-10 h-10",
                            },
                        }}
                    />
                </SignedIn>
            </div>

            <div className="flex items-center space-x-2 flex-wrap order-2 ml-auto">
                <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={handleUploadComplete}
                    onUploadError={handleUploadError}
                    input={{ parentFolderId: currentFolder }}
                />
                <NewFolderDialog currentFolder={currentFolder} />
            </div>
        </header>
    )
}

