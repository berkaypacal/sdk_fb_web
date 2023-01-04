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
    token: "link-sandbox-93cc857c-6bbe-43bb-81b5-4357c7cb8bb1",
    onSuccess: (public_token, metadata) => {
      window.location.href = "" + redirect + "://?code=" + public_token;
      // send public_token to server
    },
  });

  return (
    <>
      {mail} <br></br>
      <button onClick={() => signInFb()}>Sign in Facebook</button>
      <button onClick={() => open()} disabled={!ready}>
        Connect a bank account
      </button>
    </>
  );
}
