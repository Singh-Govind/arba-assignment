import React, { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice";
import { Link } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};

const linkDivStyle = {
  borderBottom: "1px solid lightgray",
  paddingBlock: "0.5rem",
  mb: "0.2rem",
};

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useSelector((store) => store.user);
  const { carts } = useSelector((store) => store.carts);

  const dispatch = useDispatch();

  const logoutFn = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("isTcAccepted");
  };

  return (
    <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 0",
            mb: "2rem",
          }}
        >
          <Box>
            <Link style={linkStyle} to="/">
              <Typography
                sx={{
                  fontSize: { xs: "1.8rem", md: "2rem" },
                  backgroundColor: "custom.main",
                  color: "white",
                  padding: { xs: "0.2rem 1.5rem", md: "0.2rem 2.5rem" },
                  borderRadius: "25px",
                }}
                variant="h1"
              >
                ARBA
              </Typography>
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <Link style={linkStyle} to="/carts">
              <Box
                sx={{
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <IoCartOutline size={"2.5rem"} />
                <Box
                  sx={{
                    backgroundColor: "custom.main",
                    color: "custom.text",
                    position: "absolute",
                    top: -10,
                    right: -10,
                    padding: "2px 7px",
                    borderRadius: "50%",
                  }}
                >
                  {carts.length}
                </Box>
              </Box>
            </Link>
            <Box>
              <Box
                sx={{
                  width: "2.5rem",
                  height: "2.5rem",
                  backgroundColor: "#00AAC3",
                  borderRadius: "50%",
                  cursor: "pointer",
                  position: "relative",
                }}
                onClick={() => setShowMenu(!showMenu)}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                  src={user.avatar}
                  alt={user.fullName}
                />
                {showMenu && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 45,
                      right: 0,
                      backgroundColor: "white",
                      minWidth: "9rem",
                      minHeight: "7rem",
                      padding: "0.5rem 0rem 0.5rem 0",
                      textAlign: "center",
                      zIndex: "999",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                  >
                    <Link style={linkStyle} to="/mystore">
                      <Box sx={linkDivStyle}>My Store</Box>
                    </Link>
                    <Link style={linkStyle} to="/profile">
                      <Box sx={linkDivStyle} mb="0.2rem">
                        Profile
                      </Box>
                    </Link>
                    <Box paddingBlock="0.5rem" onClick={logoutFn}>
                      Logout
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Navbar;
