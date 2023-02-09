import axios, { HttpStatusCode } from "axios";
import qs from "qs";

import environment from "./env-vars";

interface SpotifyTokenResponseData {
  access_token: string;
  token_type: string;
  expires_in: number;
}

const S_TO_MS = 1000;

const ACCESS_TOKEN_INFO = {
  authorization: "",
  expiration: -1,
};

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

function getClientAuthorizationStr(): string {
  const { spotify_client_id, spotify_client_secret } = environment;

  const preEncode = `${spotify_client_id}:${spotify_client_secret}`;
  const encoded = Buffer.from(preEncode).toString("base64");
  const withPrefix = `Basic ${encoded}`;
  return withPrefix;
}

export async function getWebAPIAuthorizationHeader(): Promise<string> {
  if (ACCESS_TOKEN_INFO.expiration - Date.now() > 0) {
    return ACCESS_TOKEN_INFO.authorization;
  }

  const headers = {
    Authorization: getClientAuthorizationStr(),
    "Content-type": "application/x-www-form-urlencoded",
  };
  const data = {
    grant_type: "client_credentials",
  };
  const tokenResponse = await axios.post(TOKEN_ENDPOINT, qs.stringify(data), {
    headers,
  });

  if (tokenResponse.status != HttpStatusCode.Ok) {
    throw new Error("failed to get token from spotify");
  }
  if (
    !tokenResponse.headers ||
    tokenResponse.headers.getContentType === "application/json"
  ) {
    throw new Error("not json response");
  }

  const responseData = tokenResponse.data as SpotifyTokenResponseData;

  // save token
  const authStr = `${responseData.token_type} ${responseData.access_token}`;
  ACCESS_TOKEN_INFO.authorization = authStr;
  // subtract a minute from expiration (in seconds)
  // and approximate expiration timestamp
  ACCESS_TOKEN_INFO.expiration =
    Date.now() + S_TO_MS * (responseData.expires_in - 60);
  return ACCESS_TOKEN_INFO.authorization;
}
