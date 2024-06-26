import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../main";

const textField = {
  "& .MuiInput-underline:before": {
    borderBottom: `2px solid custom.main`,
  },
  "& .MuiInput-underline:after": {
    borderBottom: `2px solid custom.main`,
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottom: `2px solid custom.main`,
  },
};

function Register() {
  const [showPassword, setShowPassword] = useState({ p: false, cp: false });
  const [user, setUser] = useState({
    userName: "",
    password: "",
    fullName: "",
    email: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handlePasswordVisibility = (v) => {
    if (v === "p") {
      setShowPassword((prev) => {
        return {
          p: !prev.p,
        };
      });
    } else {
      setShowPassword((prev) => {
        return {
          cp: !prev.cp,
        };
      });
    }
  };

  const enterUserValue = (e, key) => {
    setUser({
      ...user,
      [key]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password !== confirmPassword) {
      alert("password and confirm password do not match!");
      return;
    }
    register();
  };

  const register = async () => {
    try {
      await fetch(`${baseUrl}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      navigate("/login");
    } catch (e) {
      console.log("something went wrong while registering", e.message);
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          minHeight: "100lvh",
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            minWidth: "50%",
            backgroundImage: "url('/left2.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></Box>
        <Box
          sx={{
            minWidth: { xs: "100%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBlock: "2rem",
          }}
        >
          <Box
            sx={{
              width: "100px",
              height: "100px",
              backgroundColor: "custom.main",
              borderRadius: "50%",
              marginBottom: "1rem",
            }}
          ></Box>
          <h1>ARBA</h1>
          <Typography
            sx={{ maxWidth: "400px", textAlign: "center", marginTop: "1rem" }}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus,
            hic.
          </Typography>
          <Box
            sx={{
              maxWidth: "400px",
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
                autoFocus
                value={user.userName}
                onChange={(e) => enterUserValue(e, "userName")}
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
                autoFocus
                value={user.email}
                onChange={(e) => enterUserValue(e, "email")}
              />
              <TextField
                sx={textField}
                variant="standard"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword.p ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={user.password}
                onChange={(e) => enterUserValue(e, "password")}
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
              {user.password !== confirmPassword && (
                <Typography color="red">password didn't match</Typography>
              )}
              <Button
                sx={{
                  mt: "1rem",
                  backgroundColor: "custom.main",
                  borderRadius: "20px",
                  "&:hover": {
                    backgroundColor: "custom.secondary",
                  },
                }}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
              >
                Register
              </Button>
            </form>

            <Box
              sx={{
                mt: "2rem",
              }}
            >
              <Typography>
                Already have an account?{" "}
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#292929",
                  }}
                  to="/login"
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
