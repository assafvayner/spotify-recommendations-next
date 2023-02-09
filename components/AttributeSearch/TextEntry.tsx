import { Input } from "antd";

interface TextEntryProps {
  setText: (text: string) => void;
  text: string;
  label: string;
}

const TEXT_ENTRY_STYLE: React.CSSProperties = {
  width: "100vh",
  alignContent: "normal",
  display: "flex",
};

export default function TextEntry(props: TextEntryProps): JSX.Element {
  return (
    <div style={TEXT_ENTRY_STYLE}>
      <Input
        allowClear={true}
        placeholder={`Search for ${props.label}`}
        onChange={(e) => props.setText(e.target.value)}
        value={props.text}
        size="large"
      />
    </div>
  );
}
