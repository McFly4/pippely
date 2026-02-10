"use client"

import { UserProfile } from "@/auth/components"
import { ThemeToggle } from "@/shared/components/theme"

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <UserProfile />
    </div>
  )
}
