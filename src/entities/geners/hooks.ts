import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { getTags } from "./model"
import axios from "axios"
import { Tag } from "resend"

interface IResponseGenres {
  data: Tag[] | undefined
  isFetching: boolean
  isError: boolean
}

export const useTags = (): IResponseGenres => {
  const { data, isFetching, isError } = useQuery<Tag[]>({
    queryKey: ["tagsList"],
    queryFn: async () => await getTags(),
    refetchOnWindowFocus: false,
  })

  return { data, isFetching, isError }
}

export function useMutateGenres() {
  const qc = useQueryClient()
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (req: Omit<any, "id">[]) =>
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
    mutationFn: (req: any[]) =>
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
