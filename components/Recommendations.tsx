import { Button, List } from "antd";

import listStyle from "../styles/list-style";
import { SpotifyArtistSubItem, SpotifyTrackItem } from "../types/spotify-types";
import ImageComponent from "./ImageComponent";

interface RecommendationsProps {
  tracks: SpotifyTrackItem[] | undefined;
}

function by(artists: SpotifyArtistSubItem[]): string {
  if (artists.length === 0) {
    return "";
  }
  if (artists.length === 1) {
    return ` by ${artists[0].name}`;
  }
  const names = artists.map((artist) => artist.name);
  return ` by ${names.join(", ")}`;
}

const RECOMMENDATIONS_STYLE: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  alignItems: "center",
};

export default function Recommendations(props: RecommendationsProps) {
  if (!props.tracks || props.tracks.length === 0) {
    return <></>;
  }
  // return empty frag if tracks are undefined or empty
  return (
    <div style={RECOMMENDATIONS_STYLE}>
      <div style={{ width: "100vh" }}>
        <List
          itemLayout="horizontal"
          dataSource={props.tracks}
          renderItem={(item, index) => (
            <Recommendation track={item} index={index} />
          )}
          bordered={true}
          style={listStyle}
        />
      </div>
    </div>
  );
}

interface RecommendationProps {
  track: SpotifyTrackItem;
  index: number;
}

function Recommendation(props: RecommendationProps) {
  const { track, index } = props;
  const images = track.album.images;
  return (
    <List.Item>
      <ImageComponent images={images} />
      <Button type="default" href={track.external_urls.spotify} target="_blank">
        {`${index + 1}: ${track.name}${by(track.artists)}`}
      </Button>
    </List.Item>
  );
}
