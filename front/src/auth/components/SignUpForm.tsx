"use client"

import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { useSignUp } from "@/auth/hooks/useSignUp"
import { toast } from "sonner"

export default function SignUpForm() {
  const { mutate: signUp, isPending } = useSignUp()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Construire le nom complet pour Better Auth
    const signUpPayload = {
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`
    }

    console.log(`signUpPayload`, signUpPayload)

    signUp(signUpPayload, {
      onSuccess: () => {
        toast.success("Inscription réussie ! Veuillez vérifier votre email pour confirmer votre compte.", {
          position: "top-right"
        })
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message || error?.message || "Une erreur est survenue lors de l'inscription"
        toast.error(errorMessage, {
          position: "top-right"
        })
      }
    })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Créer un compte</CardTitle>
        <CardDescription>Inscrivez-vous pour commencer</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Jean"
                value={formData.firstName}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Dupont"
                value={formData.lastName}
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="exemple@email.com"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={8}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Inscription..." : "S'inscrire"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
