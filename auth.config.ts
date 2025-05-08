import type { NextAuthConfig } from "next-auth"

import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"

import { getUserByEmail } from "./src/entities/user/model"

import bcrypt from "bcryptjs"
import { LoginSchema } from "./schemas/shemas"

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Github({
      clientId: process.env.GIT_CLIENT_ID,
      clientSecret: process.env.GIT_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    Credentials({
      async authorize(credentials) {
        const validetedFields = LoginSchema.safeParse(credentials)

        if (validetedFields.success) {
          const { email, password } = validetedFields.data
          const user = await getUserByEmail(email)
          if (!user || !user.password) return null

          const passwordMatch = await bcrypt.compare(password, user.password)
          if (passwordMatch) return user
        }
        return null
      },
    }),
  ],
  pages: {
    error: "/auth/error",
    signIn: "/auth/login",
    signOut: "/signout",
  },
} satisfies NextAuthConfig
