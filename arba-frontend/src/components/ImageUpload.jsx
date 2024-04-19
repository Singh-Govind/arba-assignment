import React, { useState } from "react";
import { baseUrl } from "../main";

const UploadForm = ({ setData, setImage }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch(`${baseUrl}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image.");
      }

      const data = await response.json();
      // setData((prev) => ({ ...prev, image: data.imageUrl }));
      setImage(data.imageUrl);
      console.log("Image uploaded successfully:", data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }}
      >
        Upload Image
      </button>
    </div>
  );
};

export default UploadForm;
