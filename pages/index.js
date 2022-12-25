import {
  signInWithPopup,
  FacebookAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { authentication } from "../service/firebaseConfig";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const [mail, setMail] = useState("");
  function signInFb() {
    const provider = new FacebookAuthProvider();

    signInWithRedirect(authentication, provider)
      .then((res) => {
        setMail("thene girdi");

        if (res.user != null && res.user != undefined) {
          setMail("Başarılı");

          console.log(res.user);
          window.location.href = "vfb://?code=" + res.user.email;
        }
      })
      .catch((err) => {
        setMail("HATA catch " + err);
        console.error(err);
      });
  }

  getRedirectResult(authentication).then((response) => {
    console.log(response);
    if (response != null && response != undefined) {
      window.location.href = "vfb://?code=" + res.user.email;
    }
  });

  return (
    <>
      {mail} <br></br>
      <button onClick={() => signInFb()}>Sign in</button>
    </>
  );
}
