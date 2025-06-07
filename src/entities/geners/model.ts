import axios from "axios"

export async function getGenres() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BOT_API_URL}/genres`)
  return res.data
}
