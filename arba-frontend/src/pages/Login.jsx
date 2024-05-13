import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
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

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.userName) {
      navigate("/");
    }
  }, [user]);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName === "" || password === "") {
      alert("please provide all details!");
      return;
    }
    login();
  };

  const login = async () => {
    try {
      let res = await fetch(`${baseUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      });
      res = await res.json();

      if (res.msg === "user") {
        localStorage.setItem("user", JSON.stringify(res.user));
        dispatch(setUser(res.user));
        navigate("/");
      } else {
        alert("Incorrect username or Password");
      }
    } catch (e) {
      alert("somethign went wrong, please try again");
      console.log("something went wrong while login", e.message);
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
            paddingBlock: "3rem",
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
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <TextField
                sx={textField}
                variant="standard"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handlePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
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
                Login
              </Button>
            </form>

            <Box
              sx={{
                mt: "2rem",
              }}
            >
              <Typography>
                Don't have an account?{" "}
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#292929",
                  }}
                  to="/register"
                >
                  Sign up
                </Link>{" "}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
