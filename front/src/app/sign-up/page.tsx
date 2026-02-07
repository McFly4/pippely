import Link from "next/link"
import { SignUpForm } from "@/components/auth"
import { ThemeToggle } from "@/components/theme"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md space-y-4">
        <SignUpForm />
        <p className="text-center text-sm text-muted-foreground">
          Déjà un compte?{" "}
          <Link href="/sign-in" className="font-medium text-primary hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}
