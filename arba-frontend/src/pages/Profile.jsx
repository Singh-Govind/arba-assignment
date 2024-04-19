import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import TC from "../components/TC";
import EditProfile from "../components/EditProfile";
import ChangePassword from "../components/ChangePassword";
import { setUser } from "../store/userSlice";
import { baseUrl } from "../main";

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const buttonStyle = {
  mt: "1rem",
  backgroundColor: "#00AAC3",
  color: "white",
  boxShadow: "0",
  borderRadius: "0",
  "&:hover": {
    backgroundColor: "#00AAC3",
    boxShadow: "none",
  },
};

function Profile() {
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);
  const handleOpenChangePassword = () => setOpenChangePassword(true);
  const handleCloseChangePassword = () => setOpenChangePassword(false);

  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();

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

      let res = await fetch(`${baseUrl}/user/update-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: user.userName,
          avatar: data.imageUrl,
        }),
      });
      res = await res.json();
      if (res.msg === "profile updated") {
        dispatch(setUser({ ...user, avatar: data.imageUrl }));
        setSelectedFile(null);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      handleSubmit();
    }
  }, [selectedFile]);

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: "1rem",
        }}
      >
        <Box
          sx={{
            width: "200px",
            height: "200px",
            mb: "1rem",
            position: "relative",
          }}
        >
          <img style={imageStyle} src={user.avatar} alt={user.userName} />
          <Box
            sx={{
              position: "absolute",
              backgroundColor: "lightgray",
              bottom: 0,
              width: "100%",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <input type="file" onChange={handleFileChange} />
          </Box>
        </Box>
        <Typography>{user.userName}</Typography>
        <Typography>{user.fullName}</Typography>
        <Typography>{user.email}</Typography>
        <Button onClick={handleOpenUpdate} sx={buttonStyle}>
          Update Profile
        </Button>
      </Box>
      <hr />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: "3rem",
          gap: "5rem",
        }}
      >
        <Button onClick={handleOpen} sx={buttonStyle}>
          See T&C
        </Button>
        <Button onClick={handleOpenChangePassword} sx={buttonStyle}>
          Change Password
        </Button>
      </Box>
      <TC open={open} handleClose={handleClose} />
      <EditProfile
        open={openUpdate}
        handleClose={handleCloseUpdate}
        user={user}
      />
      <ChangePassword
        open={openChangePassword}
        handleClose={handleCloseChangePassword}
        user={user}
      />
    </Box>
  );
}

export default Profile;
