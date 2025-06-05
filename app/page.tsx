"use client"
import localFont from "next/font/local"
import Link from "next/link"

import Doge from "../public/doge.svg"
import FreeCodeCumpSVGLogo from "../public/free-code-camp-logo.svg"

import { CreepingLineTextg } from "@/shared/consts/creepingLineText"
import { NewsCard } from "@/shared/ui"
import { Container } from "@/shared/ui/container"
import { useGitHubLiveData } from "../src/entities/liveData/gitHubLiveData/hooks"

import ProjectsSection from "../src/shared/ui/projectCard/projectCard"

const myFontLable = localFont({
  src: "../src/shared/assets/fonts/NewFontGGG-Regular.ttf",
  display: "swap",
})

export default function Home() {
  const { data, isFetching, isError } = useGitHubLiveData()

  return (
    <Container className="grid grid-cols-1 gap-6">
      <div className="border-secondaryMain relative flex overflow-x-hidden rounded-lg border p-3">
        <div className="animate-marque flex gap-2 whitespace-nowrap">
          <div> </div>
          {[1, 2, 3, 4].map(el => {
            return <span key={el}>{CreepingLineTextg}</span>
          })}
        </div>

        <div className="animate-marque2 absolute flex gap-2 whitespace-nowrap">
          <div> </div>
          {[1, 2, 3, 4].map(el => {
            return <span key={el}>{CreepingLineTextg}</span>
          })}
        </div>
      </div>

      <ProjectsSection projects={data} loading={isFetching} error={isError} />

      <div className="flex gap-4">
        <NewsCard
          className="flex-1"
          discription={"Best way learn to code - for free"}
          href="https://www.freecodecamp.org/"
          PicSrc={<FreeCodeCumpSVGLogo />}
          title={"freeCodeCamp"}
        />
        <NewsCard
          className="flex-1"
          discription={"My YouTube channel"}
          title={"Wu-Shi podcast"}
        />
      </div>
      <Link
        href={`${process.env.NEXT_PUBLIC_RAUMARO_DISIGN_LINK}`}
        target="_blank"
      >
        <div className="flex justify-center self-center">
          <h1 className={myFontLable.className}>design by raumaro</h1>
          <div className="mt-[5px] ml-3 scale-200">
            <Doge />
          </div>
        </div>
      </Link>
    </Container>
  )
}
