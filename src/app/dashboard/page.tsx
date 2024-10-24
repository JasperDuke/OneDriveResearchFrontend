"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getToken } from "../utils/token";
import FileList from "../components/FileList";

const Dashboard = () => {
  const [user, setUser] = useState<{ displayName: "string" } | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [files, setFiles] = useState<any[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push("/"); // If no token, redirect to login
    }

    // Fetch user profile
    axios
      .get(`http://localhost:4000/me?token=${token}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error(error));

    // Fetch OneDrive files
    axios
      .get(`http://localhost:4000/onedrive/files?token=${token}`)
      .then((response) => setFiles(response.data))
      .catch((error) => console.error(error));
  }, [router]);

  return (
    <div>
      <h1>Welcome, {user ? user?.displayName : "User"}</h1>

      <h2>Your OneDrive Files</h2>
      {files ? <FileList files={files} /> : <p>Loading files...</p>}
    </div>
  );
};

export default Dashboard;
