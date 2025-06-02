export interface Repo {
  name: string
  owner: string
  language: string
  language_color: string
  description: string
  updated_at: string // ISO string
  id: string
  url: string
}

export interface RepoList {
  data: Repo[]
  updated: string // ISO string
}
