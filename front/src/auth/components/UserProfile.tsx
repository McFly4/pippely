"use client"

import { useSignOut } from "@/auth/hooks/useSignOut"
import { useAuth } from "@/auth/hooks/useAuth"
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Separator } from "@/shared/components/ui/separator"

export default function UserProfile() {
  const { user, isLoading, isAuthenticated } = useAuth()
  const { mutate: signOut, isPending } = useSignOut()

  if (isLoading) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Chargement...</p>
        </CardContent>
      </Card>
    )
  }

  if (!isAuthenticated || !user) {
    return null // Le middleware redirigera vers /auth/sign-in
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Profil utilisateur</CardTitle>
            <CardDescription>Bienvenue {user.firstName} !</CardDescription>
          </div>
          <Badge variant={user.emailVerified ? "default" : "secondary"}>
            {user.emailVerified ? "Vérifié" : "Non vérifié"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Nom complet</p>
            <p className="text-base">
              {user.firstName} {user.lastName}
            </p>
          </div>

          <Separator />

          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p className="text-base">{user.email}</p>
          </div>

          <Separator />

          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Rôle</p>
            <Badge variant="outline">{user.role}</Badge>
          </div>
        </div>

        <Button onClick={() => signOut()} disabled={isPending} variant="destructive" className="w-full">
          {isPending ? "Déconnexion..." : "Se déconnecter"}
        </Button>
      </CardContent>
    </Card>
  )
}
