import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { IoMdCloudUpload } from "react-icons/io";
import TC from "../components/TC";
import EditProfile from "../components/EditProfile";
import ChangePassword from "../components/ChangePassword";
import { setUser } from "../store/userSlice";
import { baseUrl } from "../main";
import Footer from "../components/Footer";

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const buttonStyle = {
  textTransform: "none",
  mt: "1rem",
  backgroundColor: "custom.main",
  color: "white",
  boxShadow: "0",
  borderRadius: "0",
  "&:hover": {
    backgroundColor: "custom.secondary",
    boxShadow: "none",
  },
};

function Profile() {
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
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
        let obj = { ...user, avatar: data.imageUrl };
        dispatch(setUser(obj));
        localStorage.setItem("user", JSON.stringify(obj));
        setSelectedFile(null);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
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
            width: "250px",
            height: "250px",
            mb: "1rem",
            position: "relative",
            border: "1px solid lightgray",
          }}
        >
          {!loading ? (
            <img style={imageStyle} src={user.avatar} alt={user.userName} />
          ) : (
            <img
              style={imageStyle}
              src="/loading.gif"
              alt="image upload loading"
            />
          )}
          <Box
            sx={{
              position: "absolute",
              backgroundColor: "rgba(0,0,0,0.3)",
              bottom: 0,
              width: "100%",
              textAlign: "center",
              cursor: "pointer",
              paddgin: "0",
            }}
          >
            <div>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="contained-button-file"
                type="file"
                onChange={handleFileChange}
              />
              <label
                htmlFor="contained-button-file"
                sx={{
                  cursor: "pointer",
                  borderBottom: "1px solid black",
                  background: "transparent",
                }}
              >
                <Button
                  variant="contained"
                  component="span"
                  fullWidth
                  sx={{
                    backgroundColor: "inherit",
                    color: "white",
                    boxShadow: "0",
                    borderRadius: "0",
                    border: "0",
                    "&:hover": {
                      backgroundColor: "inherit",
                      boxShadow: "none",
                    },
                  }}
                >
                  <IoMdCloudUpload size={"1.5rem"} color="custom.main" />
                </Button>
              </label>
            </div>

            {/* File upload end */}
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
      <Footer />
    </Box>
  );
}

export default Profile;
