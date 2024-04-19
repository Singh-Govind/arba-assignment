import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const buttonStyle = {
  mt: "1rem",
  backgroundColor: "#00AAC3",
  padding: "0.1rem 3rem",
  color: "white",
  boxShadow: "0",
  borderRadius: "0",
  "&:hover": {
    backgroundColor: "#00AAC3",
    boxShadow: "none",
  },
};

const textField = {
  marginBlock: "5px",
  "& .MuiInput-underline:before": {
    borderBottom: `2px solid #00AAC3`,
  },
  "& .MuiInput-underline:after": {
    borderBottom: `2px solid #00AAC3`,
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottom: `2px solid #00AAC3`,
  },
};

function EditProfile({ open, handleClose, user: userProps }) {
  const [user, setUserFn] = useState(userProps);

  const dispatch = useDispatch();

  const enterUserValue = (e, key) => {
    setUserFn({
      ...user,
      [key]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateProfile();
  };

  const updateProfile = async () => {
    try {
      let res = await fetch(`http://localhost:8000/user/update-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      res = await res.json();
      if (res.msg === "profile updated") {
        dispatch(setUser(user));
        handleClose();
      }
    } catch (e) {
      console.log("something went wrong while registering", e.message);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Update Profile
          </Typography>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              marginTop: "2rem",
              justifyContent: "space-around",
            }}
          >
            <form onSubmit={handleSubmit}>
              <TextField
                sx={textField}
                variant="standard"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                disabled="true"
                autoFocus
                value={user.userName}
              />
              <TextField
                sx={textField}
                variant="standard"
                margin="normal"
                required
                fullWidth
                id="fullname"
                label="Fullname"
                name="fullname"
                autoComplete="fullname"
                autoFocus
                value={user.fullName}
                onChange={(e) => enterUserValue(e, "fullName")}
              />
              <TextField
                sx={textField}
                variant="standard"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                disabled="true"
                autoFocus
                value={user.email}
              />
              <Button
                type="submit"
                sx={{ ...buttonStyle, ml: "auto", width: "100%", mt: "1rem" }}
              >
                Update Profile
              </Button>
            </form>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: "2rem",
            }}
          >
            <Button onClick={handleClose} sx={buttonStyle}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default EditProfile;
