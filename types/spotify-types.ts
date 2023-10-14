interface HasExternalUrls {
  external_urls: { [key: string]: string };
}

export enum SpotifyItemType {
  ALBUM = "album",
  ARTIST = "artist",
  TRACK = "track",
}

export interface SpotifyImageData {
  height: number;
  url: string;
  width: number;
}

// represents union of used fields in response objects
// for artist and track search results
export interface SpotifySearchResultItem extends HasExternalUrls {
  // common non optional
  name: string;
  type: SpotifyItemType;
  id: string;

  // artist fields
  images?: SpotifyImageData[];
  genres?: string[];

  // track fields
  album?: {
    images: SpotifyImageData[];
  };
  artists?: SpotifyArtistSubItem[];
  duration_ms?: number;
  explicit?: boolean;
}

export interface SpotifyItemSharedData extends HasExternalUrls {
  href: string;
  images: SpotifyImageData[];
  name: string;
  type: SpotifyItemType;
  uri: string;
}

// artist object under album or track item
export interface SpotifyArtistSubItem extends HasExternalUrls {
  href: string;
  id: string;
  name: string;
  type: string; // artist
  uri: string;
}

// not used anymore
export interface SpotifyAlbumItem extends SpotifyItemSharedData {
  album_type: string; // perhaps only "album" or "single"
  artists: SpotifyArtistSubItem[];
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
}

export interface SpotifyArtistItem extends SpotifyItemSharedData {
  id: string;
  popularity: number;
  genres: string[];
  followers: { href: string; total: number };
}

export interface SpotifyTrackItem extends SpotifyItemSharedData {
  external_ids: { [key: string]: string };
  id: string;
  is_local: boolean;
  track_number: number;
  preview_url: string;
  explicit: boolean;
  duration_ms: number;
  disc_number: number;
  album: SpotifyAlbumItem;
  artists: SpotifyArtistSubItem[];
}

export interface Entity<ItemType> {
  href: string;
  items: ItemType[];
  limit: number;
  offset: number;
  total: number;
}

// no album lookup
export type SpotifySearchItemTypeString = "artists" | "tracks";
export interface SpotifySearchResponseData {
  tracks?: Entity<SpotifyTrackItem>;
  artists?: Entity<SpotifyArtistItem>;
}

// recommend only tracks
export interface SpotifyRecommendationResponseData {
  tracks: SpotifyTrackItem[];
}

// API?
export interface SpotifyResponseData {
  tracks: Entity<SpotifyTrackItem>[];
  albums: Entity<SpotifyAlbumItem>[];
  artists: Entity<SpotifyArtistItem>[];
}
