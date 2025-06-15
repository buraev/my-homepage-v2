import axios from "axios"

export async function getTags() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BOT_API_URL}/tags`)
  return res.data
}
