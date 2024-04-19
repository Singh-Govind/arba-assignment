import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

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

function ChangePassword({ open, handleClose, user: userProps }) {
  const [user, setUserFn] = useState({
    ...userProps,
    currentPassword: "",
    newPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    p: false,
    cp: false,
    cpp: false,
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordVisibility = (v) => {
    setShowPassword((prev) => {
      return {
        ...prev,
        [v]: !prev[v],
      };
    });
  };

  const enterUserValue = (e, key) => {
    setUserFn({
      ...user,
      [key]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.newPassword !== confirmPassword) {
      alert("new password and confirm password do not match!");
      return;
    }

    updatePassword();
  };

  const updatePassword = async () => {
    try {
      let res = await fetch(`http://localhost:8000/user/update-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      res = await res.json();
      if (res.msg === "password updated") {
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
            Change Password
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
                name="current-password"
                label="Current Password"
                type={showPassword.cpp ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={user.currentPassword}
                onChange={(e) => enterUserValue(e, "currentPassword")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handlePasswordVisibility("cpp")}
                        edge="end"
                      >
                        {showPassword.cpp ? <FaRegEye /> : <FaRegEyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                sx={textField}
                variant="standard"
                margin="normal"
                required
                fullWidth
                name="new-password"
                label="New Password"
                type={showPassword.p ? "text" : "newPassword"}
                id="new-password"
                autoComplete="new-password"
                value={user.newPassword}
                onChange={(e) => enterUserValue(e, "newPassword")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handlePasswordVisibility("p")}
                        edge="end"
                      >
                        {showPassword.p ? <FaRegEye /> : <FaRegEyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                sx={textField}
                variant="standard"
                margin="normal"
                required
                fullWidth
                name="confirm-password"
                label="Confirm Password"
                type={showPassword.cp ? "text" : "password"}
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handlePasswordVisibility("cp")}
                        edge="end"
                      >
                        {showPassword.cp ? <FaRegEye /> : <FaRegEyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {user.newPassword !== confirmPassword && (
                <Typography color="red">password didn't match</Typography>
              )}
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

export default ChangePassword;
