"use server"

import bcrypt from "bcryptjs"
import type * as z from "zod"

import { getPasswordResetTokenByToken } from "../../tokens/model"
import { getUserByEmail } from "../../user/model"

import { NewPasswordSchema } from "@/app/schemas/shemas"
import { db } from "@/app/src/shared/lib/db"

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null,
) => {
  if (!token) {
    return { error: "Mising token" }
  }

  const validateFields = NewPasswordSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: "Invalid fields" }
  }

  const { password } = validateFields.data

  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) {
    return { error: "Invalid token" }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: "Token has expired" }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: "Email does not exist" }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  })

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  })

  return { success: "Password update" }
}
