import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import SingleProduct from "../components/SingleProduct";
import Navbar from "../components/Navbar";

function Products() {
  const { products } = useSelector((store) => store.products);
  return (
    <Box>
      <Navbar />
      <Typography variant="h4">Products</Typography>
      <Grid sx={{ mt: "1rem" }} container spacing={2}>
        {products?.map((item) => (
          <Grid key={item._id} item xs={3}>
            <SingleProduct item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Products;
