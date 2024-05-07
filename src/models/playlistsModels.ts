export interface PlaylistsResponseModel {
  Playlists: Playlists;
  addedPlaylist: number;
}

export interface Playlists {
  id: string;
  owner_id: string;
  name: string;
  about: string | null;
  owner_data: OwnerData;
  list_games: ListGame[];
}

export interface ListGame {
  game_data: GameData;
}

export interface PlaylistModel {
  id: string
  owner_id: string
  name: string
  about: string
  created_at: string
  owner_data: OwnerData
  list_games: ListGame[]
}

export interface OwnerData {
  id: string
  username: string
  full_name: string
  biography: string | null
  created_at: string
}

export interface ListGame {
  game_data: GameData
}

export interface GameData {
  id: string
  title: string
  slug: string
  description: string | null
  release_date: string | null
  cover: string | null
}
