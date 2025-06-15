import React from "react"
import { GetBotLinksResponse } from "../types/types"
import { AppendBotLink } from "./AppendBotLink"
import { IResponseTags } from "../../tags/types"
import { useDeleteBotLink } from "../hooks/useDeleteBotLink"

type Props = {
  botLinks: GetBotLinksResponse
  tags: IResponseTags["data"] | undefined
}

export const BotLinks: React.FC<Props> = ({ botLinks, tags }) => {
  const { mutate: deleteBotLink } = useDeleteBotLink()

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-1 flex-col gap-2">
        {botLinks?.map((link, index) => {
          return (
            <div
              className="border-primaryLight flex flex-1 flex-col justify-between rounded-xl border-2 border-solid px-2 py-2"
              key={link.id}
            >
              <div className="flex flex-1 justify-between">
                <span>{link.url}</span>
                <button onClick={() => deleteBotLink(link.id)}>delete</button>
              </div>
              <hr className="my-2 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
              <ul className="flex flex-1 list-none flex-wrap gap-2">
                {link?.tags?.map(tag => {
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
            </div>
          )
        })}
      </div>

      <AppendBotLink tags={tags} />
    </div>
  )
}
