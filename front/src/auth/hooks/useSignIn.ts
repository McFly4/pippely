import { useMutation } from "@tanstack/react-query"
import { signIn } from "@/auth/services"
import { useAuthContext } from "@/contexts/AuthContext"
import type { SignInData } from "@/auth/types/auth"

export const useSignIn = () => {
  const { refetchSession } = useAuthContext()

  return useMutation({
    mutationFn: (data: SignInData) => signIn(data),
    onSuccess: async () => {
      await refetchSession()
    },
  })
}
