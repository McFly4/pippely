import { useMutation } from "@tanstack/react-query"
import { signUp } from "@/auth/services"
import { useAuthContext } from "@/contexts/AuthContext"
import type { SignUpData } from "@/auth/types/auth"

export const useSignUp = () => {
  const { refetchSession } = useAuthContext()

  return useMutation({
    mutationFn: (data: SignUpData) => signUp(data),
    onSuccess: async () => {
      await refetchSession()
    },
  })
}
