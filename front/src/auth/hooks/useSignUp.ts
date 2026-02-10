import { useMutation } from "@tanstack/react-query"
import { useAuthContext } from "@/contexts/AuthContext"
import type { SignUpData } from "@/auth/types/auth"
import { signUp } from "@/auth/services/signUp"

export const useSignUp = () => {
  const { refetchSession } = useAuthContext()

  return useMutation({
    mutationFn: (data: SignUpData) => signUp(data),
    onSuccess: async () => {
      await refetchSession()
    }
  })
}
