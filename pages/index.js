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
  const [token2, setToken2] = useState("");
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
    //if (
    //  isOAuthRedirect != "" &&
    //  isOAuthRedirect != null &&
    //  isOAuthRedirect != undefined
    //) {
    //  setAndroidRedirect(false);
    //}
    if(
      token2 != "" &&
      token2 != null &&
      token2 != undefined
    ){
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
    token: "link-sandbox-dc4a1977-8f04-4ba6-8167-b760b4bbcc19",
    onSuccess: async (public_token, metadata) => {
      console.log("000: "+public_token);
      setMetadata(metadata);
      setToken2(public_token);
      console.log(metadata);
      await afterToken(public_token);
      // send public_token to server
    },
  });

  function afterToken(public_token){
    window.location.href = "" + redirect + "://?code=" + public_token;
    setToken2(public_token);
  }

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
      <button
        disabled={androidRedirectFB}
        onClick={() => redirectAndroidFacebok()}
      >
        Redirect android app for Facebook
      </button>
      <button onClick={() => redirectAndroid()}>Redirect android app</button>
      
    </>
  );
}
