import { UploadIcon } from "lucide-react";
import { Button } from "./ui/button";
import { NewFolderDialog } from "./new-folder-dialog";

export default function FolderHeader() {
    const currentFolder = 0;

    return (
        <div className="flex space-x-2">
            <Button>
                <UploadIcon className="mr-2 h-4 w-4" /> Upload
            </Button>
            <NewFolderDialog currentFolder={currentFolder} />
        </div>
    )
}