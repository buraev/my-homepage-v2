import { z } from "zod"

export interface GenresList {
  id: string
  name: string
  url: string
}

export const GeneresListSchema = z.object({
  fields: z.array(
    z.object({
      id: z.string().optional(),
      url: z.string().url(),
      name: z.string(),
    }),
  ),
})

export const AppendGenereSchema = z.object({
  url: z.string().url(),
  name: z.string(),
})

export type AppendGenreFormSchema = z.infer<typeof AppendGenereSchema>

export type GeneresListFormSchema = z.infer<typeof GeneresListSchema>
