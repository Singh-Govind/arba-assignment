import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import SingleProduct from "../components/SingleProduct";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Carts() {
  const { carts: products } = useSelector((store) => store.carts);

  return (
    <Box>
      <Navbar />
      <Container>
        <Typography variant="h4">My Carts</Typography>
        <Grid sx={{ mt: "1rem" }} container spacing={2}>
          {products?.map((item) => (
            <Grid key={item._id} item xs={12} sm={6} md={3}>
              <SingleProduct item={item} />
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            mt: "2rem",
          }}
        >
          <Link
            style={{
              textDecoration: "0",
              fontSize: "1.2rem",
              marginLeft: "auto",
              backgroundColor: "#292929",
              color: "white",
              padding: "0.5rem 2.5rem",
              borderRadius: "20px",
            }}
            to="/"
          >
            Checkout
          </Link>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}

export default Carts;
