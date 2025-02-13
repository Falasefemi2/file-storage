export interface File {
  id: number
  name: string
  size: number
  url: string
  parent: number
}

export interface Folder {
  id: number
  name: string
  parent: number | null
}

