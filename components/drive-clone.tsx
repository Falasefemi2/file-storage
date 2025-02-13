"use client"

import { useState } from "react"

import { UploadIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mockFiles, mockFolders } from "./mock-data"
import { NewFolderDialog } from "./new-folder-dialog"
import FolderContents from "./folder-contents"



export default function DriveClone() {
  const [folders, setFolders] = useState(mockFolders)

  const handleCreateFolder = (name: string) => {
    const newFolder = {
      id: folders.length + 1,
      name,
      parent: 0,
    }
    setFolders([...folders, newFolder])
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Google Drive Clone</h1>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <span>Root</span>
          </div>
          <div className="flex space-x-2">
            <Button>
              <UploadIcon className="mr-2 h-4 w-4" /> Upload
            </Button>
            <NewFolderDialog onCreateFolder={handleCreateFolder} />
          </div>
        </div>

        <FolderContents files={mockFiles} folders={folders} currentFolder={0} />
      </div>
    </div>
  )
}

