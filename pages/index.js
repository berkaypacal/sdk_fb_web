import {
  signInWithPopup,
  FacebookAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { authentication } from "../service/firebaseConfig";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const [mail, setMail] = useState("");
  function signInFb() {
    const provider = new FacebookAuthProvider();

    signInWithPopup(authentication, provider)
      .then((res) => {
        setMail("Hata Var");

        if (res.user.email != null && res.user.email != "") {
          //setMail(res.user.email);
          if (res.user != null && res.user != undefined) {
            setMail("Başarılı");

            console.log(res.user);
            window.location.href = "vfb://?code=" + res.user.email;
          }

          //console.log(res);
        } else {
          setMail("HATA 111");
        }
      })
      .catch((err) => {
        //setMail(err);
        setMail("HATA catch " + err);

        //console.log(err);
      });
  }

  return (
    <>
      {mail} <br></br>
      <button onClick={() => signInFb()}>Sign in</button>
    </>
  );
}
