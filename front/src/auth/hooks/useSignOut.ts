import { useMutation, useQueryClient } from "@tanstack/react-query"
import { signOut } from "@/auth/services/signOut"
import { useRouter } from "next/navigation"

export const useSignOut = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      queryClient.setQueryData(["session"], null)
      router.push("/auth/sign-in")
    }
  })
}
