"use client"
import Link from "next/link"
import { FileIcon, FolderIcon } from "lucide-react"
import { files as allFiles, folders as allFolders } from "../server/schema"
import { InferSelectModel } from "drizzle-orm"

type FileType = InferSelectModel<typeof allFiles>
type FolderType = InferSelectModel<typeof allFolders>

interface FolderContentsProps {
  files: FileType[]
  folders: FolderType[]
  currentFolder: number
}


const FolderContents: React.FC<FolderContentsProps> = ({ files, folders, currentFolder }) => {
  const filteredFiles = files.filter((file) => file.parent === currentFolder);
  const filteredFolders = folders.filter((folder) =>
    folder.parent === currentFolder || (currentFolder === 0 && folder.parent === null)
  );

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 bytes';

    const k = 1024;
    const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredFolders.map((folder) => (
        <Link key={folder.id} href={`/f/${folder.id ?? 0}`} className="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
          <FolderIcon className="h-6 w-6 mr-2 text-yellow-400" />
          <span className="truncate">{folder.name}</span>
        </Link>
      ))}
      {filteredFiles.map((file) => (
        <a key={file.id} href={file.url || ''} className="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors" target="_blank" rel="noopener noreferrer">
          <FileIcon className="h-6 w-6 mr-2 text-blue-400" />
          <div className="flex flex-col overflow-hidden">
            <span className="truncate">{file.name}</span>
            <span className="text-xs text-gray-400">{file.size ? formatFileSize(file.size) : 'Unknown size'}</span>
          </div>
        </a>
      ))}
    </div>
  );
};


export default FolderContents
