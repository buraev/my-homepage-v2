import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { ProjectRepoList } from "./type"
import { fetchDataFromGithub } from "./model"

interface IResponseProjectRepoList {
  data: ProjectRepoList | undefined
  isFetching: boolean
  isError: boolean
}

export const useGitHubLiveData = (): IResponseProjectRepoList => {
  const { data, isFetching, isError } = useQuery<ProjectRepoList>({
    queryKey: ["github"],
    queryFn: async () => await fetchDataFromGithub(),
    refetchOnWindowFocus: false,
  })

  return { data, isFetching, isError }
}
