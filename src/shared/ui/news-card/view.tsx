"use client"

import { useRouter } from "next/navigation"

import Audioslave from "../../../../public/audioslave.svg"

import { Card, Icon } from "@/shared/ui"
import { cx } from "@/shared/utils"

interface NewsCardProps {
  className?: string
  href?: string
  title: string
  PicSrc?: any
  discription: string
}

export const NewsCard = ({
  className,
  href,
  title,
  PicSrc,
  discription,
  ...props
}: NewsCardProps) => {
  const router = useRouter()
  return (
    <Card
      href={href}
      className={cx(
        "border-primarylight border-primaryLight flex transform flex-col overflow-hidden rounded-2xl border border-solid transition-transform duration-300 hover:scale-102",
        className,
      )}
    >
      <div className="flex h-[165px] scale-50 justify-center self-center">
        {PicSrc ? PicSrc : <Audioslave />}
        {/* <Image */}
        {/*   alt={title} */}
        {/*   blurDataURL={BLUR} */}
        {/*   className="scale-50 object-cover" */}
        {/*   placeholder="blur" */}
        {/*   quality={60} */}
        {/*   src={picSrc ? picSrc : audioslave} */}
        {/* /> */}
      </div>

      <article className="z-100 flex grow flex-col justify-between px-4 py-5 font-semibold">
        <div className="flex flex-col gap-2">
          <span className="text-xs leading-4.5 text-stone-200 uppercase">
            {title}
          </span>
          <h5 className="line-clamp-2 text-base text-stone-300">
            {discription}
          </h5>
        </div>

        <div className="mt-4 flex items-center gap-1 font-normal text-stone-400">
          <Icon className="h-5 w-5" name="common/calendar" />
          <p className="text-sm leading-4.5">20.20.21</p>
        </div>
      </article>
    </Card>
  )
}
