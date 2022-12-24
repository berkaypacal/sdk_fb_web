import {
  signInWithPopup,
  FacebookAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { authentication } from "../service/firebaseConfig";
import React, { Component } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [mail, setMail] = React.useState("");

  function signInFb() {
    const provider = new FacebookAuthProvider();
    signInWithPopup(authentication, provider)
      .then((res) => {
        if (res.user.email != null && res.user.email != "") {
          //setMail(res.user.email);
          setMail("Başarılı");

          window.location.href = "vfb://?code=" + res.user.email;
          console.log(res);
        } else {
          setMail("HATA");
        }
      })
      .catch((err) => {
        //setMail(err);
        setMail("HATA");

        //console.log(err);
      });
    console.log("aa");
  }

  return (
    <>
      <button onClick={() => signInFb()}>Test</button>
      <p>{mail}</p>
    </>
  );
}
