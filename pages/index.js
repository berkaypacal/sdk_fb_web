import {
  signInWithPopup,
  FacebookAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { authentication } from "../service/firebaseConfig";
export default function Home() {
  const [mail, setMail] = useState("");
  function signInFb() {
    const provider = new FacebookAuthProvider();
    signInWithPopup(authentication, provider)
      .then((res) => {
        setMail("thene girdi");

        if (res.user != null && res.user != undefined) {
          setMail("Başarılı");

          console.log(res.user);
          window.location.href = "payt://?code=" + res.user.displayName;
        }
      })
      .catch((err) => {
        setMail("HATA catch " + err);
      });
  }

  return (
    <>
      {mail} <br></br>
      <button onClick={() => signInFb()}>Sign in</button>
    </>
  );
}
