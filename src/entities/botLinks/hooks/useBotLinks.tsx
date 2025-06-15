import { useQuery } from "@tanstack/react-query"
import { getBotLinks } from "../models/getBotLinks"

export const useBotLinks = () => {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["botLinks"],
    queryFn: async () => await getBotLinks(),
    refetchOnWindowFocus: false,
  })

  return { data, isFetching, isError }
}
