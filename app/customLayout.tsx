"use client"

import { type ReactNode } from "react"

import { VoxelMain } from "../src/shared/ui/voxel"

import { cx } from "@/shared/utils"
import { Header } from "@/widgets/header/view"

type LayoutProps = {
  className?: string
  children?: ReactNode
}

export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div
      className={cx(
        "relative m-auto flex min-h-screen flex-col px-4 font-sans",
        className,
      )}
    >
      {/* <Toaster /> */}
      <Header />

      <main className="yargrow pb-8">
        <VoxelMain />
        {children}
      </main>
      {/* <ScrollToTopButton className="fixed bottom-40 right-4 z-50" /> */}
      {/* <Footer /> */}
    </div>
  )
}
