import axios, { HttpStatusCode } from "axios";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import qs from "qs";

import { SpotifyItemType, SpotifyResponseData } from "../types/spotify-types";
import { getWebAPIAuthorizationHeader } from "./spotify-auth";

const SEARCH_ENDPOINT = "https://api.spotify.com/v1/search";

async function searchSpotify(
  query: string,
  type: SpotifyItemType,
): Promise<SpotifyResponseData> {
  const authorizationStr = await getWebAPIAuthorizationHeader();
  const headers = {
    "Content-type": "application/json",
    Accept: "application/json",
    Authorization: authorizationStr,
  };
  const params = {
    q: query,
    type,
    offset: 0,
    include_external: false,
  };
  const searchResults = await axios.get(
    `${SEARCH_ENDPOINT}?${qs.stringify(params)}`,
    { headers },
  );
  return searchResults.data as SpotifyResponseData;
}

export function makeSearchHandler(attribute: SpotifyItemType): NextApiHandler {
  const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != "GET" || typeof req.query.query != "string") {
      return res.status(HttpStatusCode.BadRequest).end();
    }
    const query: string = req.query.query;
    const result = await searchSpotify(query, attribute);
    return res.status(HttpStatusCode.Ok).json(result);
  };

  return handler;
}
