import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { SignUpData } from "@/auth/types/auth"
import { signUp } from "@/auth/services/signUp"

export const useSignUp = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: SignUpData) => signUp(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["session"] })
    }
  })
}
