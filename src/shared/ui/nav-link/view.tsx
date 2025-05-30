"use client"
import type { ReactNode } from "react"
import type { LinkProps } from "next/link"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cx } from "@/shared/utils"

type NavLinkProps = LinkProps & {
  className?: string
  children?: ReactNode
  activeClassName?: string
}

export const NavLink = ({
  href,
  children,
  className,
  activeClassName = "",
  ...props
}: NavLinkProps) => {
  const pathname = usePathname()

  const isActive = href === pathname ? true : false

  return (
    <Link
      className={cx(className, { [activeClassName]: isActive })}
      href={href}
      {...props}
    >
      {children}
    </Link>
  )
}
