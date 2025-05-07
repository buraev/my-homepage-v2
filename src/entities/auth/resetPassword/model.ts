"use server"

import type * as z from "zod"

import { getUserByEmail } from "../../user/model"

import { ResetSchema } from "@/app/schemas/shemas"
import { sendPasswordResetEmail } from "@/app/src/shared/lib/mail"
import { generatePasswordResetToken } from "@/app/src/shared/lib/tokens"

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
  const validateFields = ResetSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: "Invalid fields" }
  }

  const { email } = validateFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { error: "Email not found" }
  }

  const passwordResetToken = await generatePasswordResetToken(email)

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  )

  return { success: "Reset email sent" }
}
