import {
  AppendGenereSchema,
  AppendGenreFormSchema,
  GeneresListFormSchema,
  GeneresListSchema,
  GenresList,
} from "@/app/src/entities/geners/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"

import {
  useDeleteGenre,
  useMutateGenres,
  useUpdateGenre,
} from "@/app/src/entities/geners/hooks"

interface IGenerateTable {
  genres: GenresList[] | undefined
}

export const GenresTable = ({ genres }: IGenerateTable) => {
  const [updatedfieldId, setUpdatedFieldId] = useState("")

  const { mutate } = useMutateGenres()

  const { mutate: updateGenre } = useUpdateGenre()

  const { mutate: deleteGenre } = useDeleteGenre()

  const methods = useForm<GeneresListFormSchema>({
    mode: "onBlur",
    resolver: zodResolver(GeneresListSchema),
  })

  const { control, reset, watch, register } = methods

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

  //

  const appendGenreMethods = useForm<AppendGenreFormSchema>({
    mode: "onBlur",
    resolver: zodResolver(AppendGenereSchema),
    defaultValues: {
      name: "",
      url: "",
    },
  })

  const {
    handleSubmit: handleSubmitGenreRegister,
    // formState: { errors, isValid },
    reset: appendGenreReset,
    register: appendGenreRegister,
  } = appendGenreMethods

  useEffect(() => {
    reset({
      fields: genres?.map(el => {
        return { name: el.name, url: el.url, id: el.id }
      }),
    })
  }, [genres])

  const onSubmit: SubmitHandler<AppendGenreFormSchema> = data =>
    mutate([data], {
      onSuccess: () => {
        appendGenreReset({ name: "", url: "" })
      },
    })

  const handleDeleteGenre = (id: string) => {
    deleteGenre(id)
  }

  const handleSetUpdatedFieldId = (id: string) => {
    setUpdatedFieldId(id)
  }

  const handleSaveUpdatedGenre = () => {
    const dataForUpdate = controlledFields.filter(
      el => el.id === updatedfieldId,
    )
    updateGenre(dataForUpdate, {
      onSuccess: () => {
        setUpdatedFieldId("")
      },
    })
  }

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmitGenreRegister(onSubmit)}
    >
      <ul className="flex flex-1 list-none flex-col justify-between gap-2">
        {controlledFields.map((field, index) => {
          return (
            <li className="flex gap-1" key={field.id}>
              <input
                disabled={field.id !== updatedfieldId}
                {...register(`fields.${index}.name` as const)}
                className="flex flex-1"
              />
              <input
                disabled={field.id !== updatedfieldId}
                {...register(`fields.${index}.url` as const)}
                className="flex flex-1"
              />
              {field.id === updatedfieldId ? (
                <button type="button" onClick={() => handleSaveUpdatedGenre()}>
                  save
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSetUpdatedFieldId(field.id)}
                >
                  update
                </button>
              )}
              {controlledFields.length > 1 && (
                <button
                  type="reset"
                  onClick={() => handleDeleteGenre(field.id)}
                >
                  delete
                </button>
              )}
            </li>
          )
        })}
      </ul>

      <div className="flex flex-1 justify-between gap-1">
        <input className="flex flex-1" {...appendGenreRegister(`name`)} />
        <input className="flex flex-1" {...appendGenreRegister(`url`)} />
        <button type="submit">append</button>
      </div>
    </form>
  )
}
