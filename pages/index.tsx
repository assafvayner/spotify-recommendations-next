import { Button } from "antd";
import debounce from "debounce";
import React, { useState } from "react";

import AttributeSearchComponent from "../components/AttributeSearch/AttributeSearchComponent";
import MainPageHeader from "../components/MainPageHeader";
import Recommendations from "../components/Recommendations";
import { SpotifyRecommendationResponseData } from "../types/spotify-types";

export default function Index(props: {}): JSX.Element {
  const [artistsSearchComponent, setArtistsSearchComponent] = useState("");
  const [trackSearchComponent, setTracksSearchComponent] = useState("");

  const [recommendations, setRecommendations] = useState(
    {} as SpotifyRecommendationResponseData,
  );

  const recommend = debounce(async () => {
    if (!artistsSearchComponent && !trackSearchComponent) {
      console.log(artistsSearchComponent, trackSearchComponent);
      // searching for nothing
      setRecommendations({} as SpotifyRecommendationResponseData);
      return;
    }
    const url = buildRecommendationUrl(
      artistsSearchComponent,
      trackSearchComponent,
    );

    const res = await fetch(url);
    const resJson = await res.json();
    const spotifyRes = resJson as SpotifyRecommendationResponseData;
    setRecommendations(spotifyRes);
  }, 1000);

  return (
    <div className="main-page">
      <MainPageHeader />
      <div
        style={{
          position: "static",
        }}
      >
        <AttributeSearchComponent
          attribute="artists"
          setAttributeValue={setArtistsSearchComponent}
        />
        <AttributeSearchComponent
          attribute="tracks"
          setAttributeValue={setTracksSearchComponent}
        />

        <Button type="primary" onClick={recommend}>
          recommend!
        </Button>
        <Recommendations tracks={recommendations.tracks} />
      </div>
    </div>
  );
}

function buildRecommendationUrl(artists: string, tracks: string) {
  let url = `/api/recommendations?`;
  if (artists) {
    url = `${url}artists=${artists}`;
  }
  if (tracks) {
    if (artists) {
      url += "&";
    }
    url = `${url}tracks=${tracks}`;
  }
  console.log(url);
  return url;
}
