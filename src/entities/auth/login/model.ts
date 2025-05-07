"use server"

import { AuthError } from "next-auth"
import type * as z from "zod"

import { getTwoFactorTokenByEmail } from "../../tokens/model"
import { getUserByEmail } from "../../user/model"
import { getTwoFactorConfirmationByUserId } from "../twoFactorConfirmation/model"

import { signIn } from "@/app/auth"
import { DEFAUL_LOGIN_REDIRECT } from "@/app/routes"
import { LoginSchema } from "@/app/schemas/shemas"
import { db } from "@/app/src/shared/lib/db"
import {
  sendTwoFactorTokenEmail,
  sendVerificationEmail,
} from "@/app/src/shared/lib/mail"
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/app/src/shared/lib/tokens"

export const loginUser = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: "Invalid fields" }
  }

  const { email, password, code } = validateFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist" }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    )

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    )

    return { success: "Confirmation email sent" }
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)

      if (!twoFactorToken) {
        return { error: "Invalid code" }
      }

      if (twoFactorToken.token !== code) {
        return { error: "Invalid code" }
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date()

      if (hasExpired) {
        return { error: "Code expired" }
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      })

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id,
      )

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        })
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      })
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email)

      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token)

      return { twoFactor: true }
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAUL_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" }
        default:
          return { error: "default signIn error" }
      }
    }
    throw error
  }
}
