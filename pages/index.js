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
          setMail("Başarılı");

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

  // onAuthStateChanged(authentication, (user) => {
  //   if (user != null && user != undefined) {
  //     console.log(user);
  //     window.location.href = "vfb://?code=" + user.email;
  //   }

  //   //window.close();
  // });

  function nextauth() {
    signIn();
  }

  const { data: session } = useSession();

  if (session) {
    console.log("giriş yapıldu" + session.user.email);
    return (
      <>
        Signed in as {session.accessToken} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
