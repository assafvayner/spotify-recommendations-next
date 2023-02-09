const environment = {
  spotify_client_id: process.env.SPOTIFY_CLIENT_ID ?? "",
  spotify_client_secret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
} as const;

export default environment;