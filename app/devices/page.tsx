"use client"

import { useEffect, useRef, useState } from "react"
import { animate } from "animejs"
import attention from "@/app/public/attention.png"
import Image from "next/image"

export default function CyberpunkLoader() {
  const barRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [statusText, setStatusText] = useState("ОТПРАВКА 41 %")

  useEffect(() => {
    if (!barRef.current || !textRef.current) return

    // Сначала прогресс
    animate(barRef.current, {
      width: ["0%", "100%"],
      duration: 3000,
      easing: "easeInOutQuad",
      complete: () => {
        // После завершения — меняем текст
        setStatusText("ОТПРАВКА 41 %")

        // Анимация исчезновения текста
        animate(textRef.current!, {
          opacity: [1, 0],
          duration: 1000,
          easing: "easeInOutQuad",
        })
      },
    })
  }, [])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-center self-center">
        <Image src={attention} alt="attention" width={75} height={75} />
      </div>
      <div className="text-primaryMain flex justify-center self-center rounded-sm border-2 border-red-600 bg-red-600 px-4 py-1 font-mono text-2xl shadow-[0_0_15px_#ff0000]">
        ПЕРЕВОД СРЕДСТВ...
      </div>
      <div className="flex items-center justify-center font-mono">
        <div className="flex w-96 flex-1 flex-col justify-center self-center rounded-sm border-2 border-red-600 shadow-[0_0_15px_#ff0000]">
          <div className="h-5 w-full overflow-hidden rounded-sm border-b-2 border-red-600 px-0.5 py-1">
            <div
              ref={barRef}
              className="bg-blue h-full"
              style={{ width: "0%" }}
            ></div>
          </div>
          <div className="flex flex-1 justify-center self-center">
            <div className="mt-4 flex h-3 flex-1 justify-center self-center border-r-2 border-red-600"></div>
            <div
              ref={textRef}
              className="glitch flex flex-1 justify-center self-center whitespace-nowrap"
              data-text={statusText}
            >
              {statusText}
            </div>
            <div className="mt-4 flex h-3 flex-1 justify-center self-center border-r-2 border-red-600"></div>
          </div>
        </div>
      </div>{" "}
    </div>
  )
}
