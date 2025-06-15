import {
  RenameTagFormSchema,
  RenameTagSchema,
  Tag,
} from "@/app/src/entities/tags/types"
import { IGenerateTagsTableSettings } from "./tagsTableSettings"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useDeleteTag, useUpdateTag } from "@/app/src/entities/tags/hooks"

interface ITagTableTagEdit extends IGenerateTagsTableSettings {}

export const TagTableTagEdit = ({ tags }: ITagTableTagEdit) => {
  const [currentTag, setCurrentTag] = useState("")

  const [deletedTagId, setDeletedTagId] = useState("")

  const { mutate: updateTag } = useUpdateTag()

  const { mutate: deleteTag } = useDeleteTag()

  const methods = useForm<RenameTagFormSchema>({
    mode: "onBlur",
    resolver: zodResolver(RenameTagSchema),
    defaultValues: {
      fields: tags && [...tags],
    },
  })

  const {
    control,
    reset,
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods

  const { fields } = useFieldArray({
    control,
    name: "fields",
  })

  const watchFieldArray = watch("fields")
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray?.[index],
    }
  })

  const handleSetCurrentTag = (id: string) => {
    setCurrentTag(id)
  }

  const handleResetValues = () => {
    reset({
      fields: tags?.map(el => {
        return { name: el.name, id: el.id }
      }),
    })
  }

  const handleResetField = () => {
    setCurrentTag("")
    handleResetValues()
  }

  const handleSetDeletedTagId = (id: string) => {
    setDeletedTagId(id)
  }

  const handleDeleteTag = () => {
    deleteTag(deletedTagId, {
      onSuccess: () => {
        setDeletedTagId("")
      },
    })
  }

  useEffect(() => {
    handleResetValues()
  }, [tags])

  const onSubmit: SubmitHandler<RenameTagFormSchema> = data =>
    updateTag(data.fields.filter(el => el.id === currentTag)[0], {
      onSuccess: () => {
        setCurrentTag("")
      },
    })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex">
      <ul className="flex flex-1 list-none flex-col justify-between gap-2">
        {controlledFields?.map((tag, index) => {
          return (
            <li
              key={tag.id}
              className="flex flex-1 justify-between gap-2 rounded-xl"
            >
              <input
                disabled={tag.id !== currentTag}
                className={
                  tag.id !== currentTag
                    ? "border-primaryLight flex flex-1 justify-between rounded-xl border-2 border-solid px-2 py-1"
                    : "flex flex-1 justify-between rounded-xl border-2 border-solid border-amber-50 px-2 py-1"
                }
                {...register(`fields.${index}.name` as const)}
              />
              <div className="flex gap-1">
                {tag.id === currentTag && (
                  <div className="flex flex-1 gap-4">
                    <button
                      type="submit"
                      className="rounded-full border-1 border-solid p-2 hover:cursor-pointer"
                    >
                      V
                    </button>
                    <button
                      className="rounded-full border-1 border-solid p-2 hover:cursor-pointer"
                      onClick={() => handleResetField()}
                    >
                      X
                    </button>
                  </div>
                )}
                {tag.id !== currentTag && (
                  <button
                    className="rounded-xl border-1 border-solid px-2 py-1 hover:cursor-pointer"
                    onClick={() => {
                      handleSetDeletedTagId("")
                      handleSetCurrentTag(tag.id)
                      handleResetValues()
                    }}
                  >
                    rename
                  </button>
                )}

                {tag.id === deletedTagId && (
                  <div className="flex flex-1 gap-4">
                    <button
                      className="rounded-full border-1 border-solid p-2 hover:cursor-pointer"
                      onClick={() => handleDeleteTag()}
                    >
                      V
                    </button>
                    <button
                      className="rounded-full border-1 border-solid p-2 hover:cursor-pointer"
                      onClick={() => handleSetDeletedTagId("")}
                    >
                      X
                    </button>
                  </div>
                )}

                {tag.id !== deletedTagId && (
                  <button
                    className="rounded-xl border-1 border-solid px-2 py-1 hover:cursor-pointer"
                    onClick={() => {
                      handleSetCurrentTag("")
                      handleSetDeletedTagId(tag.id)
                      handleResetField()
                    }}
                  >
                    delete
                  </button>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </form>
  )
}
