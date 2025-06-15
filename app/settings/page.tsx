"use client"

import { UserRole } from "@/app/prisma/app/generated/prisma/client"
import { logout } from "@/app/src/entities/auth/logout/logout"
import { useBotLinks } from "@/app/src/entities/botLinks/hooks/useBotLinks"
import { BotLinks } from "@/app/src/entities/botLinks/ui/BotLinks"
import { useTags } from "@/app/src/entities/tags/hooks"
import { useCurrentUser } from "@/app/src/entities/user/hooks"
import { RoleGate } from "@/app/src/entities/user/service/roleGate"
import { Button } from "@/app/src/shared/ui"
import { TagsTable } from "@/app/src/shared/ui/tagsTable/tagsTable"
import { UserCard } from "@/app/src/shared/ui/userCard/userCard"

export default function Settings() {
  const user = useCurrentUser()

  const { data: tags } = useTags()

  const { data: boLinks } = useBotLinks()

  const handleSignOut = () => {
    logout()
  }

  return (
    <div className="mx-auto flex w-full max-w-prose flex-col gap-6">
      <UserCard user={user} />
      <RoleGate allowedRole={UserRole.ADMIN}>
        <TagsTable tags={tags} />
        <BotLinks botLinks={boLinks} tags={tags} />
      </RoleGate>
      <Button type="submit" onClick={handleSignOut}>
        signout
      </Button>
    </div>
  )
}
