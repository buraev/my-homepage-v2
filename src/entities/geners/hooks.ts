import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { getGenres } from "./model"
import { GenresList } from "./types"
import axios from "axios"

interface IResponseGenres {
  data: GenresList[] | undefined
  isFetching: boolean
  isError: boolean
}

export const useGenres = (): IResponseGenres => {
  const { data, isFetching, isError } = useQuery<GenresList[]>({
    queryKey: ["genresList"],
    queryFn: async () => await getGenres(),
    refetchOnWindowFocus: false,
  })

  return { data, isFetching, isError }
}

export function useMutateGenres() {
  const qc = useQueryClient()
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (req: Omit<GenresList, "id">[]) =>
      axios.post(`${process.env.NEXT_PUBLIC_BOT_API_URL}/genres`, req),
    onSuccess: () => {
      qc.invalidateQueries(["genres"] as InvalidateQueryFilters)
      console.log("OK")
    },
  })

  return {
    mutate,
    isPending,
    isSuccess,
  }
}

export function useUpdateGenre() {
  const qc = useQueryClient()
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (req: GenresList[]) =>
      axios.put(`${process.env.NEXT_PUBLIC_BOT_API_URL}/genres`, ...req),
    onSuccess: () => {
      qc.invalidateQueries(["genres"] as InvalidateQueryFilters)
      console.log("OK")
    },
  })

  return {
    mutate,
    isPending,
    isSuccess,
  }
}

export function useDeleteGenre() {
  const qc = useQueryClient()
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (req: string) =>
      axios.delete(`${process.env.NEXT_PUBLIC_BOT_API_URL}/genres?id=${req}`),
    onSuccess: () => {
      qc.invalidateQueries(["genres"] as InvalidateQueryFilters)
      console.log("OK")
    },
  })

  return {
    mutate,
    isPending,
    isSuccess,
  }
}
