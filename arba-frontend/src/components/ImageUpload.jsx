import React, { useState } from "react";
import { baseUrl } from "../main";
import { Button } from "@mui/material";

const UploadForm = ({ setData, setImage }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(event.target.files[0]);
    setFileName(file ? file.name : "");
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
      setImage(data.imageUrl);
      console.log("Image uploaded successfully:", data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div
      style={{
        marginTop: "2rem",
        // marginBottom: "-0.8rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          borderBottom: "2px solid custom.main",
          flexGrow: "1",
        }}
      >
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="contained-button-file"
          type="file"
          onChange={handleFileChange}
        />
        <label
          htmlFor="contained-button-file"
          sx={{ cursor: "pointer", borderBottom: "1px solid black" }}
        >
          <Button
            variant="contained"
            component="span"
            sx={{
              backgroundColor: "custom.main",
              color: "white",
              boxShadow: "0",
              borderRadius: "0",
              border: "0",
              padding: "0.5rem 1rem",
              "&:hover": {
                backgroundColor: "custom.secondary",
                boxShadow: "none",
              },
            }}
          >
            Choose File
          </Button>
        </label>
        {fileName && <span>{fileName}</span>}
      </div>

      <button
        style={{
          backgroundColor: "#292929",
          color: "white",
          boxShadow: "0",
          borderRadius: "0",
          border: "0",
          padding: "0.5rem 1rem",
          marginLeft: "0.2rem",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#43454A",
            boxShadow: "none",
          },
        }}
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
