
  export default function Test() {

    return (
      <>
      <a href="https://sdk-fb-web-iszq.vercel.app" >TIKLA</a>
        <button onClick={() => {
           window.open = "https://sdk-fb-web-iszq.vercel.app"
        }}>Sign in Facebook</button>
        <a href="intent://sdk-fb-web-iszq.vercel.app/#Intent;scheme=https;package=com.example.library_try;end"> https </a>
        <a href="intent://sdk-fb-web-iszq.vercel.app/#Intent;scheme=https;package=com.example.library_try;end"> vfb </a>
        <a href="intent://sdk-fb-web-iszq.vercel.app/#Intent;scheme=app;package=com.example.library_try;end"> app </a>
      </>
    );
  }
  