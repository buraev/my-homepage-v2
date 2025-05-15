import type { NavigationPath } from "../types"

import Devices from "@/app/public/devices.svg"
import GitHub from "@/app/public/git.svg"
import Home from "@/app/public/home.svg"
import LoginSVG from "@/app/public/login.svg"
import Posts from "@/app/public/posts.svg"
import Works from "@/app/public/works.svg"
import Y18 from "@/app/public/y18.svg"

export const navigationPath: NavigationPath[] = [
  {
    href: "/",
    title: "Home",
    icon: <Home />,
  },
  {
    href: "/works",
    title: "Works",
    icon: <Works />,
  },
  {
    href: "/posts",
    title: "Posts",
    icon: <Posts />,
  },
  {
    href: "/devices",
    title: "Devices",
    icon: <Devices />,
  },
  {
    href: "/news",
    title: "News",
    icon: <Y18 />,
  },
  {
    href: `${process.env.NEXT_PUBLIC_GITHUB_REPO_SOURSE}`,
    title: "Source",
    icon: <GitHub />,
  },
  {
    href: "/auth/login",
    title: "Login",
    icon: <LoginSVG />,
  },
]
