import Link from "next/link"
import SignInForm from "@/auth/components/SignUpForm"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-4">
        <SignInForm />
        <p className="text-center text-sm text-muted-foreground">
          Pas encore de compte?{" "}
          <Link href="/auth/sign-up" className="font-medium text-primary hover:underline">
            S&apos;inscrire
          </Link>
        </p>
      </div>
    </div>
  )
}
