import Link from "next/link"
import SignUpForm from "@/auth/components/SignUpForm"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-4">
        <SignUpForm />
        <p className="text-center text-sm text-muted-foreground">
          Déjà un compte?{" "}
          <Link href="/auth/sign-in" className="font-medium text-primary hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}
