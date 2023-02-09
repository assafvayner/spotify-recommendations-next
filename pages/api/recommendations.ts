import axios, { HttpStatusCode } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import qs from "qs";

import { getWebAPIAuthorizationHeader } from "../../server/spotify-auth";
import { SpotifyRecommendationResponseData } from "../../types/spotify-types";

const RECOMMENDATION_ENDPOINT = "https://api.spotify.com/v1/recommendations";

async function getRecommendations(
  artists: string,
  tracks: string,
): Promise<SpotifyRecommendationResponseData> {
  const authorizationStr = await getWebAPIAuthorizationHeader();
  const headers = {
    "Content-type": "application/json",
    Accept: "application/json",
    Authorization: authorizationStr,
  };
  const params: { [key: string]: string } = {};
  let process = false;
  if (artists !== "") {
    params["seed_artists"] = artists;
    process = true;
  }
  if (tracks !== "") {
    params["seed_tracks"] = tracks;
    process = true;
  }
  // do not process request if no seed values set
  if (!process) {
    return Promise.reject("missing parameters");
  }
  const recommendationResponse = await axios.get(
    `${RECOMMENDATION_ENDPOINT}?${qs.stringify(params)}`,
    { headers },
  );
  return recommendationResponse.data as SpotifyRecommendationResponseData;
}

export default async function recommendationsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method != "GET") {
    return res.status(HttpStatusCode.BadRequest).end();
  }
  const artists =
    typeof req.query.artists === "string" ? req.query.artists : "";
  const tracks = typeof req.query.tracks === "string" ? req.query.tracks : "";
  if (artists === "" && tracks === "") {
    return res.status(HttpStatusCode.BadRequest).end();
  }
  const result = await getRecommendations(artists, tracks);

  return res.status(HttpStatusCode.Ok).json(result);
}
