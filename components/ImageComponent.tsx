import { SpotifyImageData } from "../types/spotify-types";

interface ImageProps {
  images?: SpotifyImageData[];
}

export default function ImageComponent(props: ImageProps) {
  const { images } = props;
  return (
    <>
      {images && images.length > 0 && (
        <img width="100px" src={images[images.length - 1].url} alt="" />
      )}
    </>
  );
}
