"use client"

import { useHackerNews } from "@/app/src/entities/hackernews/model"

export default function News() {
  const { data } = useHackerNews()
  return (
    <div className="mx-auto flex w-full max-w-prose flex-col gap-6">
      <table className="flex flex-col gap-2">
        {data?.map((el, index) => {
          return (
            <tbody key={el.id}>
              <tr>
                <td>
                  <span>{index + 1}.</span>
                </td>
                <td>
                  <span>
                    <a className="whitespace-nowrap underline" href={el.url}>
                      {el.title}
                    </a>
                  </span>
                </td>
              </tr>
            </tbody>
          )
        })}
      </table>
    </div>
  )
}
