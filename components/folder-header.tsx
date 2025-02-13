import { UploadIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewFolderDialog } from "./new-folder-dialog"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"


export default function FolderHeader() {
    const currentFolder = 0

    return (
        <header className="flex items-center justify-between p-4 bg-background border-b">
            <div className="flex items-center space-x-4">
                <Button variant="outline">
                    <UploadIcon className="mr-2 h-4 w-4" />
                    Upload
                </Button>
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

