import { SidebarTrigger } from "@/shared/components/ui/sidebar"

export default function MembresPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b p-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-2xl font-bold">Membres</h1>
        </div>
      </header>
      <main className="flex-1 p-6">
        <p className="text-muted-foreground">Gérez les membres de votre équipe ici.</p>
      </main>
    </div>
  )
}
