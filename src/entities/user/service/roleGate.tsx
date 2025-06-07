"use client"

import { UserRole } from "@/app/prisma/app/generated/prisma/client"
import { useCurrentRole } from "../hooks"

interface RoleGateProps {
  children: React.ReactNode
  allowedRole: UserRole | undefined
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole()
  if (role !== allowedRole) {
    return
  }
  return <>{children}</>
}
