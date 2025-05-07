"use client"
import type {
  QueryClient,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import qs from "qs"

import type { HackerNewsType } from "./types"

import type { QueryObject } from "@/shared/types"

async function fetchTopStores() {
  return await axios.get(`${process.env.NEXT_PUBLIC_HACKER_NEWS_TOP}`)
}

async function fetchItem(id: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_HACKER_NEWS_ITEM}${id}.json`,
  )
  return res.data
}

async function main() {
  const topstories = await fetchTopStores()
  return await Promise.all(
    topstories.data.slice(0, 30).map((id: string) => fetchItem(id)),
  )
}

export const useHackerNews = (
  id?: number,
  params?: QueryObject,
  options?: UseQueryOptions<HackerNewsType>,
): UseQueryResult<HackerNewsType> => {
  const ps = qs.stringify(params, { addQueryPrefix: true, skipNulls: true })
  return useQuery<HackerNewsType>({
    queryKey: ["person"],
    queryFn: async () => await main(),
    refetchOnWindowFocus: false,
    ...options,
  })
}

export const prefetchHackerNews = async (
  client: QueryClient,
  params?: QueryObject,
): Promise<void> => {
  const ps = qs.stringify(params, { addQueryPrefix: true, skipNulls: true })
  await client.prefetchQuery({
    queryKey: ["hackerNews"],
    queryFn: async () => await main(),
  })
}
