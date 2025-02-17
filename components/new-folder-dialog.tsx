/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import { createFolder } from "@/server/action";


interface NewFolderDialogProps {
  currentFolder: number | null; // Added current folder for hierarchy support
}

export function NewFolderDialog({ currentFolder }: NewFolderDialogProps) {
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateFolder = async () => {
    if (folderName.trim()) {
      setLoading(true);
      setError(null);

      try {
        const result = await createFolder(folderName.trim(), currentFolder);
        if (result.success) {
          setFolderName("");
          setOpen(false);
        } else {
          setError(result.message ?? "An error occurred while creating the folder");
        }
      } catch (error) {
        setError("An error occurred while creating the folder");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" /> New Folder
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
          <DialogDescription>Enter a name for your new folder.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleCreateFolder}
            disabled={loading}
            className={loading ? "bg-gray-400" : "bg-blue-500"}
          >
            {loading ? "Creating..." : "Create Folder"}
          </Button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
