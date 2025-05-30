import crypto from "crypto"
import { v4 as uuidv4 } from "uuid"

import {
  getPasswordResetTokenByEmail,
  getTwoFactorTokenByEmail,
  getVerificationTokenByEmail,
} from "../../entities/tokens/model"

import { db } from "./db"

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    })
  }
  return await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  })
}

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getPasswordResetTokenByEmail(email)

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    })
  }
  return await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  })
}

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString()
  //TODO: later change to 15 minutes
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getTwoFactorTokenByEmail(email)

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: { id: existingToken.id },
    })
  }
  return await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  })
}
