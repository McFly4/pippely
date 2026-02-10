import axios from "axios"
import type { SignInData, AuthResponse } from "@/auth/types/auth"

const url = process.env.NEXT_PUBLIC_API_URL

export async function signIn(data: SignInData): Promise<AuthResponse> {
  const { data: response } = await axios.post<AuthResponse>(`${url}/api/auth/sign-in/email`, data, {
    withCredentials: true
  })
  return response
}
