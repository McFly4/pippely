import { useQuery } from "@tanstack/react-query"
import { getUsers } from "@/shared/services/getUsers"

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["getUsers"],
    queryFn: () => getUsers()
  })
}
