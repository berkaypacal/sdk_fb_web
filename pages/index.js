import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { authentication } from "../service/firebaseConfig";
import React, { Component } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [mail, setMail] = React.useState("");

  function signInFb() {
    const provider = new FacebookAuthProvider();
    signInWithPopup(authentication, provider)
      .then((res) => {
        setMail(res.user.email);
        window.location.href = "vfb://?code=" + res.user.email;
        console.log(res);
      })
      .catch((err) => {
        setMail(err);
        console.log(err);
      });
    console.log("aa");
  }

  return (
    <>
      <button
        onClick={() => {
          signInFb();
        }}
      >
        Test
      </button>
      <h1>{mail}</h1>
    </>
  );
}
