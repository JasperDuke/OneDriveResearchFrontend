"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { storeTokenWithExpiration } from "../utils/token";

const AuthCallback = () => {
  const param = useSearchParams();
  const route = useRouter();

  useEffect(() => {
    const code = param.get("code"); // Get authorization code from URL
    console.log(code);
    if (code) {
      // Send authorization code to backend to exchange for access token
      axios
        .post("http://localhost:4000/auth/callback", { code })
        .then((response) => {
          console.log({ response });
          storeTokenWithExpiration(
            response.data.accessToken,
            response.data.expiresOn
          );
          route.push("/dashboard");
        })
        .catch((error) => {
          console.error("Error getting token:", error);
        });
    }
  }, [param]);

  return <div>Loading...</div>;
};

export default AuthCallback;
