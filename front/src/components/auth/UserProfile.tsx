"use client"

import Link from "next/link"
import { useAuth, useSignOut } from "@/hooks/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function UserProfile() {
  const { user, isLoading, isAuthenticated } = useAuth()
  const { mutate: signOut, isPending } = useSignOut()

  if (isLoading) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">Chargement...</p>
        </CardContent>
      </Card>
    )
  }

  if (!isAuthenticated || !user) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Non connecté</CardTitle>
          <CardDescription>Vous devez vous connecter pour accéder à cette page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Link href="/sign-in">
            <Button className="w-full">Se connecter</Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="outline" className="w-full">
              S&apos;inscrire
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Profil utilisateur</CardTitle>
        <CardDescription>Bienvenue {user.firstName} !</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="font-medium text-gray-500">Nom complet:</span>
            <span>
              {user.firstName} {user.lastName}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="font-medium text-gray-500">Email:</span>
            <span>{user.email}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="font-medium text-gray-500">Rôle:</span>
            <span>{user.role}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="font-medium text-gray-500">Vérifié:</span>
            <span>{user.emailVerified ? "Oui" : "Non"}</span>
          </div>
        </div>

        <Button onClick={() => signOut()} disabled={isPending} variant="destructive" className="w-full">
          {isPending ? "Déconnexion..." : "Se déconnecter"}
        </Button>
      </CardContent>
    </Card>
  )
}
