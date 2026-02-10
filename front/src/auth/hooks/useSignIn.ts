import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { SignInData } from "@/auth/types/auth"
import { signIn } from "@/auth/services/signIn"

export const useSignIn = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: SignInData) => signIn(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] })
    }
  })
}
