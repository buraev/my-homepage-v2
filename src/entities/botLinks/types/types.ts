import { z } from "zod"
import { Tag } from "../../tags/types"

export interface BotLink {
  id: string
  url: string
  tags: Tag[]
}

export type GetBotLinksResponse = BotLink[] | undefined

export const AppendBotLinkSchema = z.object({
  url: z
    .string({ required_error: "required field" })
    .min(1, { message: "min 1" })
    .max(100, { message: "max 100" }),
  tags: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
  allTags: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      }),
    )
    .optional(),
})

export type AppendBotLinkFormSchema = z.infer<typeof AppendBotLinkSchema>

export type AppendBotLinkFormSchemaWithoutTags = Omit<
  z.infer<typeof AppendBotLinkSchema>,
  "allTags"
>
