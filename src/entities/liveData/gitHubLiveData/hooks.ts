import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query"
import { RepoList } from "./type"
import { fetchDataFromGithub } from "./model"

export const useGitHubLiveData = (): UseQueryResult<RepoList> => {
  return useQuery<RepoList>({
    queryKey: ["github"],
    queryFn: async () => await fetchDataFromGithub(),
    refetchOnWindowFocus: false,
  })
}
