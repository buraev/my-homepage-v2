"use client"
import localFont from "next/font/local"
import Image from "next/image"
import Link from "next/link"

import profilePic from "../public/profile-img.jpg"

import Doge from "../public/doge.svg"
import FreeCodeCumpSVGLogo from "../public/free-code-camp-logo.svg"

import { CreepingLineTextg } from "@/shared/consts/creepingLineText"
import { Icon, NavLink, NewsCard } from "@/shared/ui"
import { Button } from "@/shared/ui/button"
import { Container } from "@/shared/ui/container"

const myFontLable = localFont({
  src: "../src/shared/assets/fonts/NewFontGGG-Regular.ttf",
  display: "swap",
})

export default function Home() {
  return (
    <Container className="grid max-w-prose grid-cols-1 gap-6">
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
      {/* <div className="flex"> */}
      {/*   <div className="z-20 grow"> */}
      {/*     <p className="text-orange">Super Nintendo</p> */}
      {/*     <p className="text-orange">Sega Genesis</p> */}
      {/*   </div> */}
      {/*   <div className="shrink-0 overflow-hidden rounded-full border"> */}
      {/*     <Image alt="Profile image" height={96} src={profilePic} width={96} /> */}
      {/*   </div> */}
      {/* </div> */}
      <div className="flex flex-1 justify-between self-center">
        <div className="flex flex-col">
          <p className="text-secondaryMain py-2 text-xl">About</p>
          <p className="text-textMain text-base">Russian hacker</p>
        </div>

        {/* <div className="flex items-center justify-center"> */}
        {/*   <NavLink */}
        {/*     className="flex items-center justify-center gap-1" */}
        {/*     href={"./works"} */}
        {/*   > */}
        {/*     <Button className="hover:bg-orange/95 w-full md:w-fit" size="sm"> */}
        {/*       <span className="text-[0.85em] tracking-[0.075em] text-[white] transition-[0.1s] duration-[ease-in-out]"> */}
        {/*         My portfolio */}
        {/*       </span> */}
        {/*       <Icon */}
        {/*         className="h-5 w-5 text-white" */}
        {/*         name="common/chevron-right" */}
        {/*       /> */}
        {/*     </Button> */}
        {/*   </NavLink> */}
        {/* </div> */}
      </div>
      <div className="flex flex-col">
        <p className="text-secondaryMain py-2 text-xl">Bio</p>
        <div className="flex gap-3">
          <p className="text-gray-100">1995</p>
          <p className="text-white">Born in Balakovo, Russia</p>
        </div>
        <div className="flex gap-3">
          <p className="text-gray-50">2012</p>
          <div className="flex gap-1">
            <p className="text-white">
              Graduated from the Physics and Mathematics Lyceum in
            </p>
            <Link
              passHref
              target="_blank"
              href="https://ru.wikipedia.org/wiki/%D0%A1%D0%B5%D0%BC%D1%91%D0%BD%D0%BE%D0%B2_(%D0%B3%D0%BE%D1%80%D0%BE%D0%B4)"
            >
              <p className="text-secondaryLight underline">Semenov</p>
            </Link>
          </div>
        </div>
        <div className="flex gap-3">
          <p className="text-gray-50">2013</p>
          <p className="text-white">Started working as a bartender</p>
        </div>
        <div className="flex gap-3">
          <p className="text-gray-50">2019</p>
          <p className="text-white">Working as a web developer</p>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-secondaryMain py-2 text-xl">My interests</p>
        <p className="text-white">Art </p>
      </div>
      <div className="flex flex-col">
        <p className="text-secondaryMain py-2 text-xl">On the web</p>
        <p className="text-white">@buraev</p>
        <p className="text-white">@buraev_v</p>
      </div>
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
