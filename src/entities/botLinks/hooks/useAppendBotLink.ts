import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import axios from "axios"
import { AppendBotLinkFormSchema } from "../types/types"

export function useAppendBotLink() {
  const qc = useQueryClient()
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (req: { url: string; tags: { id: string }[] }) =>
      axios.post(`${process.env.NEXT_PUBLIC_BOT_API_URL}/links`, req),
    onSuccess: () => {
      qc.invalidateQueries(["botLinks"] as InvalidateQueryFilters)
      console.log("OK")
    },
  })

  return {
    mutate,
    isPending,
    isSuccess,
  }
}
