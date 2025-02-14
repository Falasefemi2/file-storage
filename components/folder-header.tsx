/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { NewFolderDialog } from "./new-folder-dialog";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function FolderHeader() {
    const router = useRouter();
    const currentFolder = 0;

    const handleUploadComplete = (res: any) => {
        console.log("Files: ", res);
        toast.success("Upload Completed");
        router.push('/');
    };

    const handleUploadError = (error: Error) => {
        toast.error(`ERROR! ${error.message}`);
    };

    return (
        <header className="flex items-center justify-between p-4 bg-background border-b">
            <div className="flex items-center space-x-4">
                <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={handleUploadComplete}
                    onUploadError={handleUploadError}
                />
                <NewFolderDialog currentFolder={currentFolder} />
                <SignedOut>
                    <SignInButton />
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
        </header>
    )
}