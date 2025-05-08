"use client"

import { useState } from "react"

import { NavLink } from "../nav-link"

import LoginSVG from "@/app/public/login.svg"
import Y18 from "@/app/public/y18.svg"

export const BurgerNavBar = () => {
  const [showNavigation, setShowNavigation] = useState(false)

  const closeNavigation = () => {
    setShowNavigation(false)
  }
  return (
    <nav className="relative">
      <div className="flex items-center justify-end">
        <button
          className="dark:focus:accent-primaryLight dark:accent-primaryMain dark:hover:bg-primaryLight flex h-10 w-10 items-center justify-center self-center rounded-lg p-2 text-sm hover:bg-gray-100 lg:hidden"
          data-collapse-toggle="navbar-default"
          type="button"
          onClick={() => setShowNavigation(!showNavigation)}
        >
          <svg
            className="mt-2 flex h-5 w-5 justify-center self-center"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1h15M1 7h15M1 13h15" stroke="currentColor" />
          </svg>
        </button>
        {showNavigation && (
          <div className="absolute top-12 right-1 bottom-0" id="navbar-default">
            <div className="leading-tighter bg-primaryLight/30 flex shrink-0 flex-col items-center gap-8 rounded-2xl p-2 text-base backdrop-blur-lg">
              <NavLink
                activeClassName="underline"
                className="hover:underline"
                href="/works"
                onClick={closeNavigation}
              >
                W
              </NavLink>
              <NavLink
                activeClassName="underline"
                className="hover:underline"
                href="/posts"
                onClick={closeNavigation}
              >
                P
              </NavLink>
              <NavLink
                className="hover:underline"
                href="/devices"
                onClick={closeNavigation}
              >
                D
              </NavLink>
              <NavLink
                className="flex justify-center gap-1 self-center hover:underline"
                href="/news"
                onClick={closeNavigation}
              >
                <span className="flex justify-center self-center">
                  <Y18 />
                </span>
              </NavLink>

              <NavLink
                className="hover:underline"
                href={`${process.env.NEXT_PUBLIC_GITHUB_REPO_SOURSE}`}
                onClick={closeNavigation}
              >
                S
              </NavLink>
              <NavLink
                className="flex justify-center gap-0.5 self-center hover:underline"
                href="/auth/login"
                onClick={closeNavigation}
              >
                <span className="mt-1 flex justify-center self-center">
                  <LoginSVG />
                </span>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
