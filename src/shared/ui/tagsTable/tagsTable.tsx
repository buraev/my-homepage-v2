import { IResponseTags } from "@/app/src/entities/tags/types"

import { TagsTableSettings } from "./tagsTableSettings"
import { TagsList } from "./tagsList"

export interface IGenerateTable {
  tags: IResponseTags["data"] | undefined
}

export const TagsTable = ({ tags }: IGenerateTable) => {
  return (
    <div className="flex flex-col gap-6">
      <TagsList tags={tags} />

      <TagsTableSettings tags={tags} />
    </div>
  )
}
