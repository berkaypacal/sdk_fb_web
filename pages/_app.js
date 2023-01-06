import AppleAssociation from "./AppleAssociation";
import { Container as NextContainer } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <Component {...pageProps}>
      <Head>
        <AppleAssociation />
      </Head>
    </Component>
  );
}
