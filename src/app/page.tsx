"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { msalInstance } from "../../msalConfig";
import { storeTokenWithExpiration } from "./utils/token";

export default function Home() {
  const router = useRouter();

  const initializeMsal = async () => {
    await msalInstance.initialize();
  };

  useEffect(() => {
    initializeMsal();
  }, []);

  const login = async () => {
    const loginRequest = {
      scopes: ["User.Read", "Files.Read.All"],
      prompt: "login",
    };

    try {
      const loginResponse = await msalInstance.loginPopup(loginRequest);
      console.log("Login Success:", loginResponse);

      if (loginResponse.accessToken) {
        storeTokenWithExpiration(loginResponse.accessToken, 600);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <>
      <h3>Clerk</h3>
      Click here to <Link href={"/login"}>Login</Link> to test Clerk.
      <hr />
      <h3>Microsoft Graph API Testing</h3>
      <button onClick={login}>Login</button>
      <hr />
    </>
  );
}
