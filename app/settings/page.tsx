"use client"

import { logout } from "@/app/src/entities/auth/logout/logout"
import { useCurrentUser } from "@/app/src/entities/user/hooks"
import { Button } from "@/app/src/shared/ui"
import { UserCard } from "@/app/src/shared/ui/userCard/userCard"

export default function Settings() {
  const user = useCurrentUser()

  const handleSignOut = () => {
    logout()
  }

  return (
    <div className="mx-auto flex w-full max-w-prose flex-col gap-6">
      <UserCard user={user} />
      <Button type="submit" onClick={handleSignOut}>
        signout
      </Button>
    </div>
  )
}
