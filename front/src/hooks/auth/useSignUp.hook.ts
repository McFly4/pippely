import { useMutation } from "@tanstack/react-query"
import { signUp } from "@/services/auth"
import { useAuthContext } from "@/contexts/AuthContext"
import type { SignUpData } from "@/types/auth.types"

export const useSignUp = () => {
  const { refetchSession } = useAuthContext()

  return useMutation({
    mutationFn: (data: SignUpData) => signUp(data),
    onSuccess: async () => {
      await refetchSession()
    },
  })
}
