import { useAppendTag } from "@/app/src/entities/tags/hooks"
import { Button } from "../button"
import { FormGroupWithMessage } from "../formGroupWithMessage/formGroupWithMessage"
import {
  AppendTagFormSchema,
  AppendTagSchema,
} from "@/app/src/entities/tags/types"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export const TagTableAppendTag = () => {
  const { mutate: appendTag } = useAppendTag()

  const methods = useForm<AppendTagFormSchema>({
    mode: "onBlur",
    resolver: zodResolver(AppendTagSchema),
  })

  const {
    control,
    reset,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit: SubmitHandler<AppendTagFormSchema> = data =>
    appendTag(data, {
      onSuccess: () => {
        reset({ name: "" })
      },
    })
  return (
    <form
      className="flex flex-1 justify-between gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormGroupWithMessage error={errors.name}>
        <input
          className="border-red-border flex flex-1 rounded-xl border-2 border-solid px-2 py-1"
          {...register(`name`)}
          placeholder="name your new tag"
        />
      </FormGroupWithMessage>
      <div>
        <Button
          type="submit"
          className="rounded-xl border-2 border-solid px-2 py-1"
        >
          Append tag
        </Button>
      </div>
    </form>
  )
}
