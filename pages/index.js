import {
  signInWithPopup,
  FacebookAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useState } from "react";
import { authentication } from "../service/firebaseConfig";

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
        setMail("HATA 222 " + err);

        //console.log(err);
      });
  }

  onAuthStateChanged(authentication, (user) => {
    console.log(user);
    window.location.href = "vfb://?code=" + user.email;

    //window.close();
  });

  return (
    <>
      <button
        onClick={() => {
          signInFb();
        }}
      >
        Test
      </button>
      <p>{mail}</p>
    </>
  );
}
