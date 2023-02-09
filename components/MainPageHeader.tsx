const MAIN_PAGE_HEADER_STYLE: React.CSSProperties = {
  height: "20vh",
  display: "contents",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "calc(10px + 2vmin)",
  color: "whitesmoke",
  lineHeight: "0px",
};

const SUBTEXT_STYLE: React.CSSProperties = {
  color: "#c7bab9",
  lineHeight: "0px",
};

export default function MainPageHeader() {
  return (
    <div style={MAIN_PAGE_HEADER_STYLE}>
      <h1 style={{ marginBottom: "2%" }}>Music Recommendation Engine</h1>
      <h5 style={SUBTEXT_STYLE}>Powered by Spotify API's</h5>
      <h5 style={SUBTEXT_STYLE}>
        Using NextJS in Typescript with ant design components
      </h5>
    </div>
  );
}
