import { useMemo } from "react"
import GitHubIcon from "@/app/public/git.svg"
import LiveCard from "../liveCard/liveCard"
import Since from "../time/since/since"
import StyledCard from "../card/styledCard"
import { ProjectRepoList } from "@/app/src/entities/liveData/gitHubLiveData/type"
import Alert from "../alert/alert"

interface IProjectSession {
  projects: ProjectRepoList | undefined
  loading: boolean
  error: boolean
}

export default function ProjectsSection({
  projects,
  loading,
  error,
}: IProjectSession) {
  const updatedProjects = useMemo(() => {
    return projects?.data?.map(p => {
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        return result
          ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
          : null
      }
      return {
        ...p,
        language_color: hexToRgb(p.language_color) ?? p.language_color,
      }
    })
  }, [projects])

  return (
    <LiveCard
      name="Projects"
      liveData={{
        sources: [
          { name: "GitHub", icon: GitHubIcon, url: "https://github.com" },
        ],
        updated: projects?.updated,
      }}
      error={error}
      loading={loading}
    >
      {projects && (
        <>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {updatedProjects?.map(project => (
              <StyledCard key={project.id}>
                <a
                  href={project.url}
                  className="flex flex-col items-center justify-between text-inherit no-underline"
                  title={`View \"${project.owner}/${project.name}\" on GitHub`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex w-full justify-between">
                    <div className="border-green-border bg-green-background text-green-foreground flex items-center justify-center gap-2 self-center rounded border px-2 py-1">
                      <div className="h-4.5 w-3.5">
                        <GitHubIcon />
                      </div>
                      <p>
                        {project.owner}/{project.name}
                      </p>
                    </div>
                    <div className="flex justify-center self-center">
                      <p
                        className="rounded px-2 py-1 text-sm"
                        style={{
                          backgroundColor: `rgba(${project.language_color}, 0.4)`,
                          border: `1px solid rgb(${project.language_color})`,
                        }}
                      >
                        {project.language}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 mb-1 text-center">{project.description}</p>
                  <p className="text-xs text-gray-500">
                    Updated <Since time={project.updated_at} />
                  </p>
                </a>
              </StyledCard>
            ))}
          </div>

          <div className="mt-4 text-center">
            <span>
              View more on{" "}
              <a
                href="https://github.com/buraev?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                GitHub
              </a>
            </span>
          </div>
        </>
      )}
      {loading && <div>loading</div>}
      {error && (
        <>
          <Alert msg="Failed to load project data" />

          <div className="text-center">
            <span>
              While I'm fixing this, you can check out my projects on{" "}
              <a
                href="https://github.com/buraev?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                GitHub
              </a>
            </span>
          </div>
        </>
      )}
    </LiveCard>
  )
}
