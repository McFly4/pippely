import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Routes publiques (accessibles sans authentification)
const publicRoutes = ["/auth/sign-in", "/auth/sign-up"]

// Routes protégées (nécessitent une authentification)
const protectedRoutes = ["/dashboard", "/profile", "/settings"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Vérifier si l'utilisateur a une session
  const sessionCookie = request.cookies.get("better-auth.session_token")
  const isAuthenticated = !!sessionCookie

  // Si l'utilisateur est sur une route protégée sans être authentifié
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !isAuthenticated) {
    const signInUrl = new URL("/auth/sign-in", request.url)
    signInUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(signInUrl)
  }

  // Si l'utilisateur est authentifié et essaie d'accéder aux pages de connexion
  if (publicRoutes.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Page d'accueil : rediriger vers dashboard si authentifié
  if (pathname === "/" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Page d'accueil : rediriger vers sign-in si non authentifié
  if (pathname === "/" && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ]
}
