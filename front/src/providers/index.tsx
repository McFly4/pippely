"use client"

import ReactQueryProvider from "./ReactQueryProvider"
import { AuthProvider } from "@/contexts/AuthContext"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </ReactQueryProvider>
  )
}
