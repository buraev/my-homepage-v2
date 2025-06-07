"use client"

import { UserRole } from "@/app/prisma/app/generated/prisma/client"
import { logout } from "@/app/src/entities/auth/logout/logout"
import { useGenres } from "@/app/src/entities/geners/hooks"
import { useCurrentUser } from "@/app/src/entities/user/hooks"
import { RoleGate } from "@/app/src/entities/user/service/roleGate"
import { Button } from "@/app/src/shared/ui"
import { GenresTable } from "@/app/src/shared/ui/genresTable/genresTable"
import { UserCard } from "@/app/src/shared/ui/userCard/userCard"

export default function Settings() {
  const user = useCurrentUser()

  const { data: geners } = useGenres()

  const handleSignOut = () => {
    logout()
  }

  return (
    <div className="mx-auto flex w-full max-w-prose flex-col gap-6">
      <UserCard user={user} />
      <RoleGate allowedRole={UserRole.ADMIN}>
        <GenresTable genres={geners} />
      </RoleGate>
      <Button type="submit" onClick={handleSignOut}>
        signout
      </Button>
    </div>
  )
}
