"use server"

import { signOut } from "@/app/auth"

export const logout = async () => {
  //you can use this your server actions
  //
  await signOut()
}
