"use client"

import ReactQueryProvider from "./ReactQueryProvider"
import { AuthProvider } from "@/contexts/AuthContext"
import { ThemeProvider } from "./ThemeProvider"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ReactQueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  )
}
