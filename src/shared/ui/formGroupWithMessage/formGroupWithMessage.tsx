import type { FC, PropsWithChildren } from "react"
import type { FieldError } from "react-hook-form"
import { FieldErrorMessage } from "../fieldErrorMessage/fieldErrorMessage"

interface FormGroupWithMessageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  error:
    | FieldError
    | Partial<{ type: number | string; message: string }>
    | undefined
}

export const FormGroupWithMessage: FC<
  PropsWithChildren<FormGroupWithMessageProps>
> = ({ error, children }) => {
  return (
    <div className="flex flex-1 flex-col">
      {children}
      <FieldErrorMessage error={error} />
    </div>
  )
}
