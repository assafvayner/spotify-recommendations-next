import { Space } from "antd";
import debounce from "debounce";
import { useEffect, useState } from "react";

import {
  SpotifySearchItemTypeString,
  SpotifySearchResponseData,
  SpotifySearchResultItem,
} from "../../types/spotify-types";
import ChosenValues from "./ChosenValues";
import SearchOptions from "./SearchOptions";
import TextEntry from "./TextEntry";

interface AttributeSearchComponentProps {
  attribute: SpotifySearchItemTypeString;
  setAttributeValue: (val: string) => void;
}

const search = async (
  attribute: SpotifySearchItemTypeString,
  query: string,
  callback: (items: SpotifySearchResultItem[]) => void,
) => {
  const url = `/api/search/${attribute}?query=${query}`;
  const res = await fetch(url);

  const resJson = await res.json();
  const res2: SpotifySearchResponseData = resJson;
  const items = res2[attribute]?.items;
  if (!items) {
    return;
  }
  callback(items);
};

const ATTRIBUTE_SEARCH_COMPONENT_STYLE: React.CSSProperties = {
  alignItems: "center",
  alignContent: "center",
  display: "flex",
  flexDirection: "column",
};

const debouncedSearch = debounce(search, 1000);

export default function AttributeSearchComponent(
  props: AttributeSearchComponentProps,
) {
  const [chosenValues, setChosenValues] = useState(
    [] as SpotifySearchResultItem[],
  );
  const [searchItems, setSearchItems] = useState(
    [] as SpotifySearchResultItem[],
  );

  const { attribute, setAttributeValue } = props;

  const [currentTextEntry, setCurrentTextEntry] = useState("");

  // set attribute recommendation query value on selection
  useEffect(() => {
    const composedQueryValue = chosenValues.map((item) => item.id).join(",");

    // search
    setAttributeValue(composedQueryValue);
  }, [attribute, chosenValues, setAttributeValue]);

  // run a search
  useEffect(() => {
    if (currentTextEntry === "") {
      return;
    }
    debouncedSearch(attribute, currentTextEntry, setSearchItems);
  }, [attribute, currentTextEntry]);

  // function to do all actions needed when an item is chosen
  const choose = (item: SpotifySearchResultItem) => {
    setChosenValues([...chosenValues, item]);
    setCurrentTextEntry("");
    setSearchItems([]);
  };

  const unchoose = (item: SpotifySearchResultItem) => {
    const newValues = [...chosenValues];
    const idx = newValues.indexOf(item);
    if (idx !== -1) {
      newValues.splice(idx, 1);
      setChosenValues(newValues);
    }
  };

  // clear search items on clearing text entry
  useEffect(() => {
    if (currentTextEntry === "" && searchItems.length !== 0) {
      setSearchItems([]);
    }
  }, [currentTextEntry, searchItems]);

  return (
    <div style={ATTRIBUTE_SEARCH_COMPONENT_STYLE}>
      <Space size="small" direction="vertical" align="center">
        <ChosenValues values={chosenValues} unchoose={unchoose} />
        <TextEntry
          setText={setCurrentTextEntry}
          text={currentTextEntry}
          label={attribute}
        />
        <SearchOptions options={searchItems} choose={choose} />
      </Space>
    </div>
  );
}
