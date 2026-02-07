import axios from "axios"

const url = process.env.NEXT_PUBLIC_API_URL

export async function signOut(): Promise<void> {
  await axios.post(
    `${url}/api/auth/sign-out`,
    {},
    {
      withCredentials: true
    }
  )
}
