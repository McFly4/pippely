# Système d'Authentification - Documentation

## Vue d'ensemble

Le système d'authentification a été intégré avec **Better Auth** (backend) et suit les best practices Next.js avec une gestion appropriée de SSR et client-side rendering.

## Architecture

```
front/src/
├── types/
│   └── auth.types.ts           # Types TypeScript pour l'authentification
├── services/auth/
│   ├── signIn.ts               # Service pour se connecter
│   ├── signUp.ts               # Service pour s'inscrire
│   ├── signOut.ts              # Service pour se déconnecter
│   ├── getSession.ts           # Service pour récupérer la session
│   └── index.ts                # Export centralisé
├── contexts/
│   └── AuthContext.tsx         # Contexte d'authentification (use client)
├── hooks/auth/
│   ├── useAuth.hook.ts         # Hook pour accéder au contexte auth
│   ├── useSignIn.hook.ts       # Hook pour se connecter
│   ├── useSignUp.hook.ts       # Hook pour s'inscrire
│   ├── useSignOut.hook.ts      # Hook pour se déconnecter
│   └── index.ts                # Export centralisé
└── components/auth/
    ├── SignInForm.tsx          # Composant formulaire de connexion
    ├── SignUpForm.tsx          # Composant formulaire d'inscription
    ├── UserProfile.tsx         # Composant profil utilisateur
    └── index.ts                # Export centralisé
```

## Composants principaux

### 1. AuthContext
- **Fichier**: `src/contexts/AuthContext.tsx`
- **Type**: Client component (`"use client"`)
- **Rôle**: Gère l'état global de l'authentification
- **Exports**:
  - `AuthProvider`: Provider à wrapper autour de l'app
  - `useAuthContext`: Hook pour accéder au contexte

### 2. Services
Tous les services utilisent **axios** avec `withCredentials: true` pour gérer les cookies.

- `signIn(data)`: Connexion avec email/password
- `signUp(data)`: Inscription avec email/password/firstName/lastName
- `signOut()`: Déconnexion
- `getSession()`: Récupération de la session courante

### 3. Hooks
Tous les hooks utilisent **React Query** pour la gestion des mutations et du cache.

- `useAuth()`: Accès à l'utilisateur connecté et à l'état d'authentification
- `useSignIn()`: Mutation pour se connecter
- `useSignUp()`: Mutation pour s'inscrire
- `useSignOut()`: Mutation pour se déconnecter

### 4. Composants UI
Tous les composants utilisent **shadcn/ui** pour l'interface.

- `SignInForm`: Formulaire de connexion avec validation
- `SignUpForm`: Formulaire d'inscription avec validation
- `UserProfile`: Affichage du profil utilisateur avec bouton de déconnexion

## Utilisation

### 1. Configuration déjà effectuée

Le `AuthProvider` est déjà intégré dans `src/providers/index.tsx`:

```tsx
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </ReactQueryProvider>
  )
}
```

### 2. Utiliser l'authentification dans un composant

```tsx
"use client"

import { useAuth, useSignOut } from "@/hooks/auth"

export function MyComponent() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const { mutate: signOut } = useSignOut()

  if (isLoading) return <div>Chargement...</div>

  if (!isAuthenticated) {
    return <div>Vous devez être connecté</div>
  }

  return (
    <div>
      <p>Bonjour {user.firstName}!</p>
      <button onClick={() => signOut()}>Se déconnecter</button>
    </div>
  )
}
```

### 3. Formulaire de connexion personnalisé

```tsx
"use client"

import { useState } from "react"
import { useSignIn } from "@/hooks/auth"

export function CustomSignIn() {
  const { mutate: signIn, isPending, isError } = useSignIn()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    signIn(
      { email, password },
      {
        onSuccess: () => {
          // Redirection ou action après connexion
          console.log("Connecté!")
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
      />
      <button type="submit" disabled={isPending}>
        {isPending ? "Connexion..." : "Se connecter"}
      </button>
      {isError && <p>Erreur lors de la connexion</p>}
    </form>
  )
}
```

### 4. Protection de routes

```tsx
"use client"

import { useAuth } from "@/hooks/auth"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export function ProtectedPage() {
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      redirect("/sign-in")
    }
  }, [isAuthenticated, isLoading])

  if (isLoading) return <div>Chargement...</div>

  return <div>Contenu protégé</div>
}
```

## Pages exemples

- `/sign-in`: Page de connexion
- `/sign-up`: Page d'inscription
- `/`: Page d'accueil avec profil utilisateur

## Types TypeScript

```typescript
interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

interface SignInData {
  email: string
  password: string
}

interface SignUpData {
  email: string
  password: string
  firstName: string
  lastName: string
}
```

## Gestion SSR/CSR

- **Contexte**: `"use client"` car il gère l'état React
- **Services**: Utilisables côté client et serveur
- **Hooks**: `"use client"` automatiquement (React hooks)
- **Composants**: Marquez explicitement avec `"use client"` si ils utilisent des hooks

## Best Practices appliquées

1. **Séparation des responsabilités**: Services, hooks, composants séparés
2. **Type safety**: Tous les types définis dans `auth.types.ts`
3. **React Query**: Gestion optimale du cache et des mutations
4. **Cookies**: Authentification sécurisée avec `withCredentials: true`
5. **shadcn/ui**: Composants UI cohérents et accessibles
6. **Error handling**: Gestion des erreurs dans tous les services
7. **Loading states**: États de chargement dans tous les composants

## Endpoints API (Backend)

- `POST /api/auth/sign-up/email`: Inscription
- `POST /api/auth/sign-in/email`: Connexion
- `POST /api/auth/sign-out`: Déconnexion
- `GET /api/auth/session`: Récupération de la session

## Variables d'environnement

Assurez-vous que `.env` contient:
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```
