import { makeSearchHandler } from "../../../server/search-util";
import { SpotifyItemType } from "../../../types/spotify-types";

const searchTracks = makeSearchHandler(SpotifyItemType.TRACK);

export default searchTracks;