import { IResponseTags } from "@/app/src/entities/tags/types"

export interface IGenerateTable {
  tags: IResponseTags["data"] | undefined
}

export const TagsList = ({ tags }: IGenerateTable) => {
  return (
    <ul className="flex flex-1 list-none flex-wrap justify-between gap-2">
      {tags?.map(tag => {
        return (
          <li
            key={tag.id}
            className="border-red-border rounded-xl border-2 border-solid px-2 py-1"
          >
            {tag.name}
          </li>
        )
      })}
    </ul>
  )
}
