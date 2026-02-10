import { useMutation } from "@tanstack/react-query"
import { useAuthContext } from "@/contexts/AuthContext"
import type { SignInData } from "@/auth/types/auth"
import { signIn } from "@/auth/services/signIn"

export const useSignIn = () => {
  const { refetchSession } = useAuthContext()

  return useMutation({
    mutationFn: (data: SignInData) => signIn(data),
    onSuccess: async () => {
      await refetchSession()
    }
  })
}
