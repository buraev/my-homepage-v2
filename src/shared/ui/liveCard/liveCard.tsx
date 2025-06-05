import React from "react"
import Since from "../time/since/since"
import StyledCard from "../card/styledCard"

export interface Source {
  name: string
  icon: React.ElementType
  url: string
  iconLeftMargin?: string
  iconRightMargin?: string
}

export interface LiveData {
  sources: Source[]
  updated?: Date
}

interface Props {
  name: string
  liveData?: LiveData
  children: React.ReactNode
  error: boolean
  loading: boolean
}

const LiveCard: React.FC<Props> = ({
  name,
  liveData,
  children,
  error,
  loading,
}) => {
  return (
    <StyledCard padding="0">
      <section id={name.toLowerCase()} className="flex w-full flex-col">
        <div className="flex justify-between">
          <h3 className="border-primaryMain bg-primaryMain text-secondaryMain rounded-br-2xl border-t-0 border-l-0 px-4 pt-0 pb-1 shadow-inner shadow-black/30">
            {name}
          </h3>
          {liveData && (
            <div className="bg-red-background border-red-border text-red-foreground flex h-7 items-center overflow-hidden rounded-bl-2xl border-b border-l px-4 py-1 font-mono font-medium">
              <div className="flex gap-2">
                <p className="animate-pulse text-sm">LIVE</p>
                <p className="text-sm">FROM</p>
              </div>
              {liveData.sources.map((source, index) => (
                <React.Fragment key={source.name}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-foreground flex items-center no-underline"
                  >
                    <div
                      className="flex"
                      style={{
                        marginLeft: source.iconLeftMargin ?? "10px",
                        marginRight: source.iconRightMargin ?? "9px",
                      }}
                    >
                      <source.icon />
                    </div>
                    <p className="text-[13.5px]">{source.name.toUpperCase()}</p>
                  </a>
                  {index + 1 !== liveData.sources.length && (
                    <p className="text-red-foreground pl-2">/</p>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 p-2 sm:p-3">{children}</div>

        {liveData && (
          <>
            {liveData.updated && (
              <p className="border-green-border bg-green-background text-green-foreground mt-1 flex items-center justify-center border-t px-2 py-1 font-mono text-sm font-medium">
                Data
                <span className="hidden sm:inline">
                  &nbsp;cached & processed&nbsp;
                </span>
                <span className="inline sm:hidden">&nbsp;updated&nbsp;</span>
                by&nbsp;
                <a
                  href="https://github.com/buraev/gochette"
                  className="text-inherit"
                >
                  gochette
                </a>
                &nbsp;
                <span className="hidden sm:inline">[</span>
                <Since time={liveData.updated} />
                <span className="hidden sm:inline">]</span>
              </p>
            )}
          </>
        )}
        {loading && (
          <p className="border-green-border bg-green-background text-green-foreground mt-1 flex items-center justify-center border-t px-2 py-1 font-mono text-sm font-medium">
            <span> loading</span>
          </p>
        )}
        {error && (
          <p className="border-red-border bg-red-background text-red-foreground mt-1 flex items-center justify-center border-t px-2 py-1 font-mono text-sm font-medium">
            <span> error</span>
          </p>
        )}
      </section>
    </StyledCard>
  )
}

export default LiveCard
