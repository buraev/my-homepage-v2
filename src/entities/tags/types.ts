import { z } from "zod"

export interface Tag {
  id: string
  name: string
}

export interface IResponseTags {
  data: Tag[] | undefined
  isFetching: boolean
  isError: boolean
}

export const AppendTagSchema = z.object({
  name: z
    .string({ required_error: "required field" })
    .min(1, { message: "min 1" })
    .max(20, { message: "max 20" }),
})

export const RenameTagSchema = z.object({
  fields: z.array(
    z.object({
      name: z
        .string({ required_error: "required field" })
        .min(1, { message: "min 1" })
        .max(20, { message: "max 20" }),
      id: z.string(),
    }),
  ),
})

export type RenameTagFormSchema = z.infer<typeof RenameTagSchema>

export type AppendTagFormSchema = z.infer<typeof AppendTagSchema>
