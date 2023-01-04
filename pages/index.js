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
  const [metadata, setMetadata] = useState("");

  const router = useRouter();
  const { redirect } = router.query;
  function signInFb() {
    const provider = new FacebookAuthProvider();

    signInWithPopup(authentication, provider)
      .then((res) => {
        setMail("thene girdi");

        if (res.user != null && res.user != undefined) {
          setMail("Başarılı");

          console.log(res.user);
          window.location.href =
            "" + redirect + "://?code=" + res.user.displayName;
        }
      })
      .catch((err) => {
        setMail("HATA catch " + err);
      });
  }

  const { open, ready } = usePlaidLink({
    token: "link-development-2510d6f3-b2cb-4270-ba4b-5189ae9fe36d",
    onSuccess: (public_token, metadata) => {
      print(public_token);
      setToken(public_token);
      setMetadata(metadata);
      print(metadata);
      window.location.href = "" + redirect + "://?code=" + public_token;
      // send public_token to server
    },
  });

  return (
    <>
      {mail} <br></br>
      {public_token} <br></br>
      {metadata} <br></br>
      <button onClick={() => signInFb()}>Sign in Facebook</button>
      <button onClick={() => open()} disabled={!ready}>
        Connect a bank account
      </button>
    </>
  );
}
