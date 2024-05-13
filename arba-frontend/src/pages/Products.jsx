import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import SingleProduct from "../components/SingleProduct";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Products() {
  const { products } = useSelector((store) => store.products);
  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          width: "100%",
          height: "100%",
          mb: { xs: "2rem", md: "5rem" },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src="/2.jpg"
          alt="products hero image"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            maxHeight: "100lvh",
            overflow: "hidden",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#292929",
            opacity: "0.3",
          }}
        ></Box>
      </Box>
      <Container>
        <Typography variant="h4">Products</Typography>
        <Grid sx={{ mt: "1rem" }} container spacing={2}>
          {products?.map((item) => (
            <Grid key={item._id} item xs={12} sm={6} md={3}>
              <SingleProduct item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}

export default Products;
