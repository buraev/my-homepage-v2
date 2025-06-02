import { Suspense } from "react"
import type { Metadata } from "next"

import { Layout } from "./customLayout"
import Providers from "./providers"
import { SessionProvider } from "next-auth/react"
import { auth } from "../auth"

import "../styles/globals.css"

import localFont from "next/font/local"

export const metadata: Metadata = {
  title: "Vasilii Buraev Homepage",
  description: "Страница в интернете Бураева Василия, Vasilii Buraev Homepage",
}

const mainFont = localFont({
  src: "../src/shared/assets/fonts/d-din/D-DINExp-Bold.otf",
  display: "swap",
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`antialiased`}>
          <Suspense>
            <Providers>
              <Layout className={mainFont.className}>{children}</Layout>
            </Providers>
          </Suspense>
        </body>
      </html>
    </SessionProvider>
  )
}
