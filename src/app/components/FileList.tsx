import { useState } from "react";
import { getToken } from "../utils/token";
import axios from "axios";

const FileList = ({ files }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleSelectFile = (fileId: string) => {
    setSelectedFiles((prevSelected) => {
      if (prevSelected.includes(fileId)) {
        return prevSelected.filter((id) => id !== fileId); // Deselect
      } else {
        return [...prevSelected, fileId]; // Select
      }
    });
  };

  const downloadFiles = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select at least one file to download.");
      return;
    }

    try {
      const token = getToken();

      if (!token) {
        alert("Token not found");
        return;
      }
      axios
        .post(
          `http://localhost:4000/download-files?token=${token}`,
          JSON.stringify({ fileIds: selectedFiles }),
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          if (response.status === 200) alert("Successfully downloaded files");
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error("Error downloading files:", error);
    }
  };

  return (
    <div>
      <h2>Select Files to Download</h2>
      <ul>
        {files &&
          files.map((file) => (
            <li key={file.id}>
              <input
                type="checkbox"
                onChange={() => handleSelectFile(file.id)}
                checked={selectedFiles.includes(file.id)}
              />
              {file.name}
            </li>
          ))}
      </ul>
      <button onClick={downloadFiles}>Download Selected Files</button>
    </div>
  );
};

export default FileList;
