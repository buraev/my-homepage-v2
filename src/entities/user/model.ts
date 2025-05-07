"use server"
import { db } from "@/app/src/shared/lib/db"

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({ where: { email } })
  } catch {
    return null
  }
}

export const getUserById = async (id: string | undefined) => {
  try {
    return await db.user.findUnique({ where: { id } })
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
    return await db.user.create({
      data: {
        name,
        email,
        password,
      },
    })
  } catch {
    return null
  }
}
