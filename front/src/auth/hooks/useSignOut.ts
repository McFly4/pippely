import { useMutation } from "@tanstack/react-query"
import { signOut } from "@/auth/services"
import { useAuthContext } from "@/contexts/AuthContext"

export const useSignOut = () => {
  const { refetchSession } = useAuthContext()

  return useMutation({
    mutationFn: () => signOut(),
    onSuccess: async () => {
      await refetchSession()
    },
  })
}
