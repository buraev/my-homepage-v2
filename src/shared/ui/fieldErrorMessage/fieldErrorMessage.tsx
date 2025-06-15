import type { FC } from "react"
import type { FieldError } from "react-hook-form"

interface FieldErrorMessageProps {
  error?:
    | FieldError
    | Partial<{
        type: number | string
        message: string
      }>
}

export const FieldErrorMessage: FC<FieldErrorMessageProps> = ({ error }) => {
  if (error?.message)
    return <p className="text-red-foreground text-xs">{error?.message}</p>
  if (error?.type === "required") return <p>Обязательное поле</p>
  if (error?.type === "pattern") return <p>Некорректный формат</p>

  return null
}
