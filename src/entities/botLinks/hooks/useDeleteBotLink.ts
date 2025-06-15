import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import axios from "axios"

export function useDeleteBotLink() {
  const qc = useQueryClient()
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (req: string) =>
      axios.delete(`${process.env.NEXT_PUBLIC_BOT_API_URL}/links?id=${req}`),
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
