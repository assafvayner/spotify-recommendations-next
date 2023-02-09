import { Poppins } from "@next/font/google";
import type { AppProps } from "next/app";

import "../styles/app.css";

const font = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={font.className}>
      <Component {...pageProps} />
    </div>
  );
}
