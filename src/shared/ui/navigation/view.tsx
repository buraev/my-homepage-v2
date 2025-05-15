import { navigationPath } from "../../consts/navigationPath"
import { NavLink } from "../nav-link"

export const Navigation = () => {
  return navigationPath.map(el => {
    return (
      <NavLink
        key={el.title}
        className="flex justify-center gap-0.5 self-center hover:underline"
        href={el.href}
      >
        <p className="hidden md:flex lg:flex">{el.title}</p>
        <span className="flex justify-center self-center">{el.icon}</span>
      </NavLink>
    )
  })
}
