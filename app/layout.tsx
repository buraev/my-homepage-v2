import { Suspense } from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"

import { Layout } from "./customLayout"
import Providers from "./providers"

import "../styles/globals.css"

export const metadata: Metadata = {
  title: "Vasilii Buraev Homepage",
  description: "Страница в интернете Бураева Василия, Vasilii Buraev Homepage",
}

const mainFont = localFont({
  src: "../src/shared/assets/fonts/JetBrainsMono-Regular.woff2",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Suspense>
          <Providers>
            <Layout className={mainFont.className}>{children}</Layout>
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}
