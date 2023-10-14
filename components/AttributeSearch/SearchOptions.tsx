import { List } from "antd";

import listStyle from "../../styles/list-style";
import { SpotifySearchResultItem } from "../../types/spotify-types";

interface SearchOptionsProps {
  choose: (val: SpotifySearchResultItem) => void;
  options: SpotifySearchResultItem[];
}

export default function SearchOptions(props: SearchOptionsProps) {
  const { options, choose } = props;
  if (options.length === 0) {
    return <></>;
  }
  return (
    <div style={{ background: "whitesmoke" }}>
      <List
        itemLayout="vertical"
        dataSource={options}
        renderItem={(item) => <SearchOption choose={choose} option={item} />}
        style={{
          width: "100vh",
          maxHeight: "20vv",
          overflow: "auto",
          ...listStyle,
        }}
        bordered={true}
      />
    </div>
  );
}

interface SearchOptionProps {
  choose: (val: SpotifySearchResultItem) => void;
  option: SpotifySearchResultItem;
}

function SearchOption(props: SearchOptionProps) {
  const { option, choose } = props;
  return (
    <List.Item
      key={option.id}
      onClick={() => choose(option)}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: "50px",
      }}
    >
      {option.album &&
        option.album.images &&
        option.album.images.length !== 0 && (
          <img src={option.album.images[option.album.images.length - 1].url} />
        )}
      {option.images && option.images.length !== 0 && (
        <img width="100px" src={option.images[option.images.length - 1].url} />
      )}
      <h2>
        {option.artists && option.artists.length !== 0
          ? `${option.name} (${option.artists[0].name})`
          : option.name}
      </h2>
    </List.Item>
  );
}
