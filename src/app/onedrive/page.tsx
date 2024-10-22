"use client";
import { useEffect } from "react";
import { msalInstance } from "../../../msalConfig";
import { useRouter } from "next/router";
import { storeTokenWithExpiration } from "../utils/token";

const OneDriveLogin = () => {
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
    <div>
      <h1>OneDrive Integration</h1>
      <button onClick={login}>Login with Microsoft</button>
    </div>
  );
};

export default OneDriveLogin;
