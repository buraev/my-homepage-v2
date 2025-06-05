import React from "react"

type AlertProps = {
  msg: string
}

const Alert: React.FC<AlertProps> = ({ msg }) => {
  return (
    <div className="border-red-border bg-red-background text-red-foreground flex items-center justify-center gap-5 rounded-[var(--border-radius)] border p-[30px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-blink h-10 w-auto"
      >
        <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <h1 className="font-sans text-[18px]"> {msg} </h1>
    </div>
  )
}

export default Alert
