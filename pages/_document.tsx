import { Html, Head, Main, NextScript } from "next/document";

function Favicon(): JSX.Element {
  return (
    <>
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
    </>
  );
}

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <Favicon />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
