import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { getTags } from "./models"
import { IResponseTags, Tag } from "./types"
import axios from "axios"

export const useTags = (): IResponseTags => {
  const { data, isFetching, isError } = useQuery<Tag[]>({
    queryKey: ["tagsList"],
    queryFn: async () => await getTags(),
    refetchOnWindowFocus: false,
  })

  return { data, isFetching, isError }
}

export function useAppendTag() {
  const qc = useQueryClient()
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (req: Omit<Tag, "id">) =>
      axios.post(`${process.env.NEXT_PUBLIC_BOT_API_URL}/tags`, req),
    onSuccess: () => {
      qc.invalidateQueries(["tags"] as InvalidateQueryFilters)
      console.log("OK")
    },
  })

  return {
    mutate,
    isPending,
    isSuccess,
  }
}

export function useUpdateTag() {
  const qc = useQueryClient()
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (req: Tag) =>
      axios.put(`${process.env.NEXT_PUBLIC_BOT_API_URL}/tags`, req),
    onSuccess: () => {
      qc.invalidateQueries(["tags"] as InvalidateQueryFilters)
      console.log("OK")
    },
  })

  return {
    mutate,
    isPending,
    isSuccess,
  }
}

export function useDeleteTag() {
  const qc = useQueryClient()
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (req: string) =>
      axios.delete(`${process.env.NEXT_PUBLIC_BOT_API_URL}/tags?id=${req}`),
    onSuccess: () => {
      qc.invalidateQueries(["tags"] as InvalidateQueryFilters)
      console.log("OK")
    },
  })

  return {
    mutate,
    isPending,
    isSuccess,
  }
}
