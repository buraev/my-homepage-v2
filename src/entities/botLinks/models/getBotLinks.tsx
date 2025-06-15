import axios from "axios"
import { GetBotLinksResponse } from "../types/types"

export const getBotLinks = async (): Promise<GetBotLinksResponse> => {
  const response = await axios.get<GetBotLinksResponse>(
    `${process.env.NEXT_PUBLIC_BOT_API_URL}/links`,
  )
  return response.data
}
