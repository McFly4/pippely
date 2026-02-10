import axios from "axios"
import type { Session } from "@/auth/types/auth"

const url = process.env.NEXT_PUBLIC_API_URL

export async function getSession(): Promise<Session | null> {
  try {
    const { data } = await axios.get<Session>(`${url}/api/auth/session`, {
      withCredentials: true
    })
    return data
  } catch {
    return null
  }
}
