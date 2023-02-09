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
      style={{ cursor: "pointer" }}
    >
      {`${option.id}: ${option.name}`}
    </List.Item>
  );
}
