/** @format */

import type { File, Folder } from "./types";

export const mockFiles: File[] = [
  {
    id: 1,
    name: "Document.docx",
    size: 1024,
    url: "/document.docx",
    parent: 0,
  },
  { id: 2, name: "Image.jpg", size: 2048, url: "/image.jpg", parent: 0 },
  {
    id: 3,
    name: "Spreadsheet.xlsx",
    size: 512,
    url: "/spreadsheet.xlsx",
    parent: 1,
  },
  {
    id: 4,
    name: "Presentation.pptx",
    size: 1536,
    url: "/presentation.pptx",
    parent: 2,
  },
];

export const mockFolders: Folder[] = [
  { id: 0, name: "Root", parent: null },
  { id: 1, name: "Work", parent: 0 },
  { id: 2, name: "Personal", parent: 0 },
  { id: 3, name: "Projects", parent: 1 }, 
];
