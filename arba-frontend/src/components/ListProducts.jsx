import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import SingleProduct from "./SingleProduct";
import { Link } from "react-router-dom";

function ListProducts() {
  const { products } = useSelector((store) => store.products);

  return (
    <Box>
      <Typography variant="h4">Products</Typography>
      <Grid sx={{ mt: "1rem" }} container spacing={2}>
        {products?.map((item) => (
          <Grid key={item._id} item xs={3}>
            <SingleProduct item={item} />
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Link
          style={{
            textDecoration: "0",
            fontSize: "1.2rem",
            marginLeft: "auto",
            backgroundColor: "#00AAC3",
            color: "white",
            padding: "0.5rem 1.5rem",
            marginTop: "2rem",
          }}
          to="/products"
        >
          All Products {">>"}
        </Link>
      </Box>
    </Box>
  );
}

export default ListProducts;
