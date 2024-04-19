import { Box } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Categories from "../components/Categories";

const boxStyle = {
  width: "100%",
  textAlign: "center",
  padding: "0.8rem 0",
};

function MyStore() {
  const [isProducts, setIsProducts] = useState(false);

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          width: "80%",
          flexGrow: "1",
          marginTop: "2rem",
          marginInline: "auto",
          bgcolor: "lightgray",
          fontWeight: "bold",
          cursor: "pointer",
          color: "white",
        }}
      >
        <Box
          onClick={() => setIsProducts(false)}
          sx={boxStyle}
          bgcolor={!isProducts ? "#00AAC3" : "inherit"}
        >
          Categories
        </Box>
        <Box
          onClick={() => setIsProducts(true)}
          sx={boxStyle}
          bgcolor={isProducts ? "#00AAC3" : "inherit"}
        >
          Products
        </Box>
      </Box>
      <Box sx={{ maxWidth: "80%", margin: "1rem auto" }}>
        {isProducts ? <Products /> : <Categories />}
      </Box>
    </Box>
  );
}

export default MyStore;
