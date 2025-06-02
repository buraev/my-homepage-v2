import axios from "axios"

export async function fetchDataFromGithub() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/github`)
  return res.data
}
