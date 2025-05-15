"use client"

import { Navigation } from "../../shared/ui/navigation/view"

import { Container } from "@/app/src/shared/ui/container"
import { cx } from "@/app/src/shared/utils"

export const Header = () => {
  return (
    <header
      className={cx(
        "shadow-card relative z-50 rounded-b-3xl pt-4 backdrop-blur-sm lg:pt-6",
      )}
    >
      <Container
        className={cx(
          "grid grid-cols-[max-content_1fr_max-content] items-center gap-y-3 xl:gap-x-10",
        )}
      >
        <nav className="col-span-2 flex items-center justify-center gap-8">
          <div className="leading-tighter flex shrink-0 items-center gap-8 text-base">
            <Navigation />
          </div>
        </nav>
      </Container>
    </header>
  )
}
