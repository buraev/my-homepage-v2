import Link from "next/link"

import { Container } from "@/app/src/shared/ui/container"
import { NavLink } from "@/app/src/shared/ui/nav-link"
import { cx } from "@/app/src/shared/utils"
import Y18 from "@/app/public/y18.svg"
import LoginSVG from "@/app/public/login.svg"

export const Header = () => {
  return (
    <header
      className={cx(
        "shadow-card relative z-50 rounded-b-3xl pt-4 backdrop-blur-sm lg:pt-6",
      )}
    >
      <Container
        className={cx(
          "grid grid-cols-[max-content_1fr_max-content] items-center gap-x-4 gap-y-3 xl:gap-x-10",
        )}
      >
        <nav className="xs:justify-between flex items-center justify-center gap-8 sm:self-center lg:col-span-2">
          <div className="flex gap-2 whitespace-nowrap">
            <Link href="./">
              <p>Vasilii Buraev</p>
            </Link>

            <span className="h-[18px] w-[1.5px] shrink-0 self-center" />
          </div>

          <div className="leading-tighter hidden shrink-0 items-center gap-8 text-base lg:flex">
            <NavLink
              activeClassName="underline"
              className="hover:underline"
              href="/works"
            >
              Works
            </NavLink>
            <NavLink
              activeClassName="underline"
              className="hover:underline"
              href="/posts"
            >
              Posts
            </NavLink>
            <NavLink className="hover:underline" href="/devices">
              Devices
            </NavLink>
            <NavLink
              className="flex justify-center gap-1 self-center hover:underline"
              href="/news"
            >
              <span>News </span>
              <span className="flex justify-center self-center">
                <Y18 />
              </span>
            </NavLink>

            <NavLink
              className="hover:underline"
              href={`${process.env.NEXT_PUBLIC_GITHUB_REPO_SOURSE}`}
            >
              Source
            </NavLink>
            <NavLink
              className="flex justify-center gap-0.5 self-center hover:underline"
              href="/auth/login"
            >
              <span>Login </span>
              <span className="mt-1 flex justify-center self-center">
                <LoginSVG />
              </span>
            </NavLink>
          </div>
        </nav>
      </Container>
    </header>
  )
}
