import { useMutation } from "@tanstack/react-query"
import { useAuthContext } from "@/contexts/AuthContext"
import { signOut } from "@/auth/services/signOut"

export const useSignOut = () => {
  const { refetchSession } = useAuthContext()

  return useMutation({
    mutationFn: () => signOut(),
    onSuccess: async () => {
      await refetchSession()
    }
  })
}
