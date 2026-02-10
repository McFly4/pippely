import { useQuery } from "@tanstack/react-query"
import { getSession } from "@/auth/services/getSession"

export const useAuth = () => {
  const { data: session, isLoading, refetch } = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false
  })

  return {
    user: session?.user || null,
    session: session || null,
    isLoading,
    isAuthenticated: !!session?.user,
    refetch
  }
}
