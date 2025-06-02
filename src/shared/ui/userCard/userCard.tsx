import { ExtendedUser } from "@/app/next-auth"
import { Container } from "../container"

interface UserInfoProps {
  user?: ExtendedUser
}

export const UserCard = ({ user }: UserInfoProps) => {
  return (
    <Container>
      <ul className="felx-col flex">
        <li className="flex flex-1 justify-between">
          <span>name</span>
          <span>{user?.name}</span>
        </li>
      </ul>
    </Container>
  )
}
