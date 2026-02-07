import { useMutation } from "@tanstack/react-query"
import { signIn } from "@/services/auth"
import { useAuthContext } from "@/contexts/AuthContext"
import type { SignInData } from "@/types/auth.types"

export const useSignIn = () => {
  const { refetchSession } = useAuthContext()

  return useMutation({
    mutationFn: (data: SignInData) => signIn(data),
    onSuccess: async () => {
      await refetchSession()
    },
  })
}
