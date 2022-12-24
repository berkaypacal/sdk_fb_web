import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { authentication } from "./firebaseConfig";

export default function Home() {
  function signInFb() {
    const provider = new FacebookAuthProvider();
    signInWithPopup(authentication, provider)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
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
    </>
  );
}
