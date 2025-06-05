export type Repo = {
  name: string
  owner: string
  language: string
  language_color: string
  description: string
  updated_at: Date
  id: string
  url: string
}

export interface ProjectRepoList {
  data: Repo[]
  updated: Date
}
