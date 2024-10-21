"use client";
import Link from "next/link";

export default function Home() {
  // const postData = async (url: string) => {
  //   const response = await fetch(url, {
  //     method: "GET",
  //     // headers: {
  //     //   Authorization: `Bearer ${process.env.AZURE_AD_TOKEN}`,
  //     // },
  //   });
  //   const data = await response.json();
  //   console.log(data);
  //   alert(data);
  // };
  const postData = (url: string) => {
    window.location.href = url;
  };
  return (
    <>
      This is Home Click here to <Link href={"/login"}>Login</Link> to test
      Cleark.
      <div>
        <h3>Microsoft Graph API Testing</h3>
        <button onClick={() => postData("http://localhost:4000/auth/login")}>
          Login
        </button>
      </div>
    </>
  );
}
