"use server"

import bcrypt from "bcryptjs"
import type * as z from "zod"

import { createUser, getUserByEmail } from "../../user/model"

import { RegisterSchema } from "@/app/schemas/shemas"
import { sendVerificationEmail } from "@/app/src/shared/lib/mail"
import { generateVerificationToken } from "@/app/src/shared/lib/tokens"

export const registerUser = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields" }
  }

  const { email, password, name } = validatedFields.data

  const hashedPassword = await bcrypt.hash(password, 10)

  const existUser = await getUserByEmail(email)

  if (existUser) {
    return { error: "Email already in use" }
  }

  await createUser(name, email, hashedPassword)

  const verificationToken = await generateVerificationToken(email)

  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return { success: "Confirmation email sent" }
}
