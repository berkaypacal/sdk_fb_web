import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { authentication } from "../service/firebaseConfig";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
