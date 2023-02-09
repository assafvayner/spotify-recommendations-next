import { makeSearchHandler } from "../../../server/search-util";
import { SpotifyItemType } from "../../../types/spotify-types";

const searchArtists = makeSearchHandler(SpotifyItemType.ARTIST);

export default searchArtists;