import { SidebarTrigger } from "@/shared/components/ui/sidebar"

export default function ProfilPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b p-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-2xl font-bold">Profil</h1>
        </div>
      </header>
      <main className="flex-1 p-6">
        <p className="text-muted-foreground">Gérez votre profil utilisateur ici.</p>
      </main>
    </div>
  )
}
