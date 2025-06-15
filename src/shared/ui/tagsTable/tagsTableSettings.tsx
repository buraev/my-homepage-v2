import { TagTableAppendTag } from "./tagsTableAppendTag"
import { TagTableTagEdit } from "./tagTableTagEdit"
import { IGenerateTable } from "./tagsTable"

export interface IGenerateTagsTableSettings extends IGenerateTable {}

export const TagsTableSettings = ({ tags }: IGenerateTagsTableSettings) => {
  return (
    <div className="flex flex-col gap-6">
      <TagTableTagEdit tags={tags} />

      <TagTableAppendTag />
    </div>
  )
}
