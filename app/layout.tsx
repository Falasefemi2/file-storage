import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react"
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Google Drive Clone",
  description: "A simple Google Drive clone built with Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={`${inter.className} bg-gray-900 text-gray-100`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}

