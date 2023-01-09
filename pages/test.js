
  export default function Test() {

    return (
      <>
      <a href="https://sdk-fb-web-iszq.vercel.app" >TIKLA</a>
        <button onClick={() => {
           window.open = "https://sdk-fb-web-iszq.vercel.app"
        }}>Sign in Facebook</button>
        <a href="intent://scan/#Intent;scheme=https;package=com.example.library_try;end"> Take a QR code </a>
      </>
    );
  }
  