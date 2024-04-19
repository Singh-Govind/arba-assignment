import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ListData from "./ListData";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../store/productSlice";
import { baseUrl } from "../main";
import AddProduct from "./AddProduct";
import FilterProducts from "./FilterProducts";

const buttonStyle = {
  textTransform: "none",
  backgroundColor: "#00AAC3",
  color: "white",
  boxShadow: "0",
  borderRadius: "0",
  "&:hover": {
    backgroundColor: "#00AAC3",
    boxShadow: "none",
  },
};

function Products() {
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleFilterOpen = () => setOpenFilter(true);
  const handleFilterClose = () => setOpenFilter(false);

  const { products } = useSelector((store) => store.products);
  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const fetchDatas = async () => {
    try {
      let res = await fetch(`${baseUrl}/product/${user.id}`);
      res = await res.json();

      dispatch(setProducts(res.products));
    } catch (e) {
      console.log("err", e.message);
    }
  };

  useEffect(() => {
    if (user.id) {
      fetchDatas();
    }
  }, [user]);

  return (
    <Box mt={"3rem"}>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          mb: "2rem",
        }}
      >
        <Button onClick={fetchDatas} sx={buttonStyle} variant="contained">
          Refresh
        </Button>
        <Button onClick={handleFilterOpen} sx={buttonStyle} variant="contained">
          Filter
        </Button>
        <Button onClick={handleOpen} sx={buttonStyle} variant="contained">
          Add
        </Button>
      </Box>
      <Box>
        <ListData data={products} fetchDatas={fetchDatas} isProduct={true} />
      </Box>
      <AddProduct
        open={open}
        handleClose={handleClose}
        fetchDatas={fetchDatas}
      />
      <FilterProducts open={openFilter} handleClose={handleFilterClose} />
    </Box>
  );
}

export default Products;
