"use server"
import { db } from "@/app/src/shared/lib/db"

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } })
    return user
  } catch {
    return null
  }
}

export const getUserById = async (id: string | undefined) => {
  try {
    const user = await db.user.findUnique({ where: { id } })
    return user
  } catch {
    return null
  }
}

export const createUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const user = await db.user.create({
      data: {
        name,
        email,
        password,
      },
    })
    return user
  } catch {
    return null
  }
}
