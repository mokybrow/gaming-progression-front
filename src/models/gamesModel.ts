export interface GamesResponse {
  id: string
  title: string
  cover: string
  description: any
  slug: string
  release_date: Date | null
  playtime: number
  completed_count: any
  wishlist_count: any
  favorite_count: any
  avg_rate: any
  age_ratings: AgeRating[]
  genres: Genre[]
  platforms: Platform[]
}

export interface GamePageResponse {
  id: string
  title: string
  cover: string
  description: any
  slug: string
  release_date: string
  playtime: number
  completed_count: any
  wishlist_count: any
  favorite_count: any
  avg_rate: any
  age_ratings: AgeRating[]
  genres: Genre[]
  platforms: Platform[]
}

export interface AgeRating {
  age_rating: AgeRating2
}

export interface AgeRating2 {
  id: string
  name: string
  type: any
  code: any
}

export interface Genre {
  genre: Genre2
}

export interface Genre2 {
  id: string
  name: string
  name_ru: any
  code: any
}

export interface Platform {
  platform: Platform2
}

export interface Platform2 {
  id: string
  platform_name: string
  platform_slug: string
  code: any
}



export interface ReleaseDate {
  [key: string]: Array<number>
}

export interface GamesCount {
  game_count: number
}