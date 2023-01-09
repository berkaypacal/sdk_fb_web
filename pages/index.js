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
  const [redirectUrl, setRedirectUrl] = useState("");
  const [userName, setUserName] = useState("");
  const [metadata, setMetadata] = useState("");

  const [androidRedirect, setAndroidRedirect] = useState(true);
  const [androidRedirectFB, setAndroidRedirectFB] = useState(true);

  const router = useRouter();
  const { redirect } = router.query;
  const { android_package } = router.query;

  useEffect(() => {
    const isOAuthRedirect = window.location.href.includes("?oauth_state_id=");
    if (
      isOAuthRedirect != "" &&
      isOAuthRedirect != null &&
      isOAuthRedirect != undefined
    ) {
      setAndroidRedirect(false);
    }
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
          setUserName(res.user.displayName);
          if (android_package != null && android_package != "") {
            setAndroidRedirectFB(false);
          } else {
            window.location.href =
              "" + redirect + "://?code=" + res.user.displayName;
          }

          console.log(res.user);
        }
      })
      .catch((err) => {
        setMail("HATA catch " + err);
      });
  }

  function redirectAndroid() {
    if (android_package != null && android_package != "") {
      window.location.href = "" + redirect + "://?code=123";

    }
  }

  function redirectAndroidFacebok() {
    if (android_package != null && android_package != "") {
      window.location.href = "" + redirect + "://?code=" + userName;
    }
  }

  const { open, ready } = usePlaidLink({
    token: "link-sandbox-ad366185-602e-464f-9471-ea9fe54de6b1",
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
      <button disabled={androidRedirect} onClick={() => redirectAndroid()}>
        Redirect android app
      </button>
      <button disabled={androidRedirectFB} onClick={() => redirectAndroidFacebok()}>
        Redirect android app for Facebook
      </button>
      <button onClick={() => redirectAndroid()}>Redirect android app</button>
      <a href="intent://sdk-fb-web-iszq.vercel.app/#Intent;scheme=https;package=com.example.library_try;end"> https </a>
        <a href="intent://sdk-fb-web-iszq.vercel.app/#Intent;scheme=https;package=com.example.library_try;end"> vfb </a>
        <a href="intent://sdk-fb-web-iszq.vercel.app/#Intent;scheme=app;package=com.example.library_try;end"> app </a>

    </>
  );
}
