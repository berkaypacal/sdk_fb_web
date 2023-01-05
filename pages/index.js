import {
  signInWithPopup,
  FacebookAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { authentication } from "../service/firebaseConfig";
import { useRouter } from "next/router";
import { usePlaidLink } from "react-plaid-link";

export default function Home() {
  const [mail, setMail] = useState("");
  const [token, setToken] = useState("");
  const [oatuhs, setoauth] = useState("");

  const [metadata, setMetadata] = useState("");

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    const isOAuthRedirect = window.location.href.includes("?oauth_state_id=");

    // do not generate a new token if page is handling an OAuth redirect.
    // instead setLinkToken to previously generated token from localStorage
    // https://plaid.com/docs/link/oauth/#reinitializing-link
    if (isOAuthRedirect) {
      const { oauth_state_id } = router.query;
      setoauth(oauth_state_id);
      console.log(oauth_state_id);

      return;
    }
  }, []);

  function signInFb() {
    const provider = new FacebookAuthProvider();

    signInWithPopup(authentication, provider)
      .then((res) => {
        setMail("thene girdi");

        if (res.user != null && res.user != undefined) {
          setMail("Başarılı");
          window.location.href =
            "" + redirect + "://?code=" + res.user.displayName;

          console.log(res.user);
        }
      })
      .catch((err) => {
        setMail("HATA catch " + err);
      });
  }

  const { open, ready } = usePlaidLink({
    token: "link-development-2510d6f3-b2cb-4270-ba4b-5189ae9fe36d",
    onSuccess: (public_token, metadata) => {
      console.log(public_token);
      setMetadata(metadata);
      console.log(metadata);
      window.location.href = "" + redirect + "://?code=" + public_token;
      // send public_token to server
    },
  });

  return (
    <>
      {oatuhs} oatuhs <br></br>
      {mail} <br></br>
      {token} token <br></br>
      {metadata} metadata <br></br>
      <button onClick={() => signInFb()}>Sign in Facebook</button>
      <button onClick={() => open()} disabled={!ready}>
        Connect a bank account
      </button>
    </>
  );
}
