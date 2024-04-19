import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice";
import { Link } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 0",
      }}
    >
      <Box>
        <Link style={linkStyle} to="/">
          <Typography
            sx={{
              fontSize: "2rem",
              backgroundColor: "#00AAC3",
              color: "white",
              padding: "0.2rem 1rem",
              borderRadius: "5px",
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
                backgroundColor: "lightblue",
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
                  backgroundColor: "lightgray",
                  minWidth: "100px",
                  padding: "0.2rem 0.5rem",
                  zIndex: "999",
                }}
              >
                <Link style={linkStyle} to="/mystore">
                  <Box mb="0.2rem">My Store</Box>
                </Link>
                <Link style={linkStyle} to="/profile">
                  <Box mb="0.2rem">Profile</Box>
                </Link>
                <Box onClick={logoutFn}>Logout</Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
