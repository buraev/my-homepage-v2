import React, { useEffect, useState } from "react"
import dayjs from "dayjs"

interface SinceProps {
  time: Date
}

// Функция fromNow, пример реализации, можно заменить своей
function fromNow(time: dayjs.Dayjs, now: dayjs.Dayjs) {
  const diffMinutes = now.diff(time, "minute")
  if (diffMinutes < 1) return "just now"
  if (diffMinutes < 60) return `${diffMinutes} minutes ago`
  const diffHours = now.diff(time, "hour")
  if (diffHours < 24) return `${diffHours} hours ago`
  const diffDays = now.diff(time, "day")
  return `${diffDays} days ago`
}

const Since: React.FC<SinceProps> = ({ time }) => {
  const [now, setNow] = useState(dayjs())

  useEffect(() => {
    const dayjsTime = dayjs(time)
    const updateInterval = dayjs().diff(dayjsTime, "hour") >= 1 ? 1000 : 10

    const intervalId = setInterval(() => {
      setNow(dayjs())
    }, updateInterval)

    return () => clearInterval(intervalId)
  }, [time])

  return <>{fromNow(dayjs(time), now)}</>
}

export default Since
