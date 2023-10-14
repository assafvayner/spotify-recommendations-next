import { DeleteOutlined } from "@ant-design/icons";
import { Col, List, Row } from "antd";

import listStyle from "../../styles/list-style";
import { SpotifySearchResultItem } from "../../types/spotify-types";
import ImageComponent from "../ImageComponent";

interface ChosenValuesProps {
  values: SpotifySearchResultItem[];
  unchoose: (values: SpotifySearchResultItem) => void;
}

export default function ChosenValues(props: ChosenValuesProps) {
  if (props.values.length === 0) {
    return <></>;
  }
  return (
    <List
      itemLayout="horizontal"
      dataSource={props.values}
      renderItem={(item) => (
        <ChosenValue item={item} removeFunc={props.unchoose} />
      )}
      bordered={true}
      style={listStyle}
    />
  );
}

function formatTime(ms: number): string {
  const date = new Date(0);
  date.setMilliseconds(ms);
  const res = date.toISOString().substring(14, 19);
  if (res.startsWith("0")) {
    return res.slice(1);
  }
  return res;
}

const CHOSEN_VALUE_STYLE: React.CSSProperties = {
  width: "100vh",
};

interface ChosenValueProps {
  item: SpotifySearchResultItem;
  removeFunc: (item: SpotifySearchResultItem) => void;
}

function ChosenValue(props: ChosenValueProps) {
  const { item } = props;
  const images = item.images ?? (item.album && item.album.images) ?? [];
  const { id, name, genres, duration_ms, explicit } = item;
  return (
    <List.Item key={id} style={CHOSEN_VALUE_STYLE}>
      <Row
        style={{
          width: "100%",
        }}
        align="middle"
      >
        <Col flex={3}>
          <h5>{name}</h5>
        </Col>
        <Col flex={3}>
          <ImageComponent images={images} />
        </Col>
        {(genres || duration_ms || explicit) && (
          <Col flex={3}>
            {genres && genres.length && <i>[{genres.join(", ")}]</i>}
            {duration_ms && <i>{`length: ${formatTime(duration_ms)}`}</i>}
            {explicit ? <p>🅴</p> : <p></p>}
          </Col>
        )}
        <Col flex={1}>
          <DeleteOutlined onClick={() => props.removeFunc(item)} />
        </Col>
      </Row>
    </List.Item>
  );
}
