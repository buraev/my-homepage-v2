import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormGroupWithMessage } from "@/app/src/shared/ui/formGroupWithMessage/formGroupWithMessage"
import { Button } from "@/app/src/shared/ui"
import { AppendBotLinkFormSchema, AppendBotLinkSchema } from "../types/types"
import { useAppendBotLink } from "../hooks/useAppendBotLink"
import { IResponseTags } from "../../tags/types"
import { useEffect } from "react"

type Props = {
  tags: IResponseTags["data"] | undefined
}

export const AppendBotLink: React.FC<Props> = ({ tags }) => {
  const { mutate: appendBotLink } = useAppendBotLink()

  const methods = useForm<AppendBotLinkFormSchema>({
    mode: "onBlur",
    resolver: zodResolver(AppendBotLinkSchema),
    defaultValues: {
      url: "",
      tags: [],
      allTags: tags,
    },
  })

  const {
    control,
    reset,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const { append: appendAllTags, remove: removeAllTags } = useFieldArray({
    control,
    name: "allTags",
  })

  const { append: appendAddedTags, remove: removeAddedTags } = useFieldArray({
    control,
    name: "tags",
  })

  const allTags = watch("allTags")
  const addedTags = watch("tags")

  useEffect(() => {
    reset({
      allTags: tags?.map(el => el),
    })
  }, [tags])

  const handleAddTagToLink = (name: string, id: string) => {
    removeAllTags(allTags?.findIndex(el => el.id === id))
    appendAddedTags({ id: id, name: name })
  }

  const handleRemoveTagToLink = (name: string, id: string) => {
    removeAddedTags(addedTags.findIndex(el => el.id === id))
    appendAllTags({ id: id, name: name })
  }

  const onSubmit: SubmitHandler<AppendBotLinkFormSchema> = data => {
    const { allTags, ...cleanData } = data
    appendBotLink(
      {
        url: cleanData.url,
        tags: cleanData.tags.map(tag => {
          return { id: tag.id }
        }),
      },
      {
        onSuccess: () => {
          reset({ url: "", allTags: tags?.map(el => el), tags: [] })
        },
      },
    )
  }

  return (
    <form
      className="border-primaryLight flex flex-1 flex-col justify-between gap-4 rounded-xl border-2 border-solid px-2 py-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-1 flex-col">
        <FormGroupWithMessage error={errors.url}>
          <input
            className="flex flex-1 px-2"
            {...register(`url`)}
            placeholder="your new link"
          />
        </FormGroupWithMessage>
        <hr className="my-2 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

        <ul className="flex flex-1 list-none flex-wrap gap-2">
          {(addedTags?.length === 0 || !addedTags) && (
            <p className="text-primaryLight p-1">tags not added yet</p>
          )}
          {addedTags?.map(tag => {
            return (
              <button
                key={tag.id}
                className="border-red-border rounded-xl border-2 border-solid px-2 py-1 hover:cursor-pointer"
                onClick={() => handleRemoveTagToLink(tag.name, tag.id)}
              >
                {tag.name}
              </button>
            )
          })}
        </ul>

        <hr className="my-2 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

        <ul className="flex flex-1 list-none flex-wrap gap-2">
          {allTags?.length === 0 && (
            <p className="text-primaryLight p-1"> tags are out</p>
          )}
          {allTags?.map(tag => {
            return (
              <button
                key={tag.id}
                className="border-primaryLight rounded-xl border-2 border-solid px-2 py-1 hover:cursor-pointer"
                onClick={() => handleAddTagToLink(tag.name, tag.id)}
              >
                {tag.name}
              </button>
            )
          })}
        </ul>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="rounded-xl border-2 border-solid px-2 py-1"
        >
          Append link
        </Button>
      </div>
    </form>
  )
}
