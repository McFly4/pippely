import axios from "axios"
import type { SignUpData, AuthResponse } from "@/types/auth.types"

const url = process.env.NEXT_PUBLIC_API_URL

export async function signUp(data: SignUpData): Promise<AuthResponse> {
  const { data: response } = await axios.post<AuthResponse>(`${url}/api/auth/sign-up/email`, data, {
    withCredentials: true
  })
  return response
}
