import { useGetUsers } from "@/hooks/users/useGetUsers.hook"

export default function Page() {
  const { data: users } = useGetUsers()

  return (
    <div>
      <div>{users}</div>
    </div>
  )
}
