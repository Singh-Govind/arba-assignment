import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Carousell from "../components/Carousell";
import { Box, Container } from "@mui/material";
import TC from "../components/TC";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../store/productSlice";
import { baseUrl } from "../main";
import { setCategories } from "../store/categorySlice";
import ListProducts from "../components/ListProducts";
import Footer from "../components/Footer";

function Home() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  useEffect(() => {
    let isTcAccepted = localStorage.getItem("isTcAccepted");
    isTcAccepted =
      isTcAccepted !== "undefined" ? JSON.parse(isTcAccepted) : false;

    if (!isTcAccepted) {
      handleOpen();
    }
  }, []);

  const fetchDatas = async () => {
    try {
      let res = await fetch(`${baseUrl}/category/${user.id}`);
      res = await res.json();
      dispatch(setCategories(res.categories));

      res = await fetch(`${baseUrl}/product/${user.id}`);
      res = await res.json();

      dispatch(setProducts(res.products));
    } catch (e) {
      console.log("err", e.message);
    }
  };

  useEffect(() => {
    if (user.userName) {
      fetchDatas();
    }
  }, [user]);

  return (
    <Box>
      <Navbar />
      <Carousell />
      <Container>
        <Box
          sx={{
            mt: "4rem",
          }}
        >
          <ListProducts />
        </Box>
        <TC open={open} handleClose={handleClose} />
      </Container>
      <Footer />
    </Box>
  );
}

export default Home;
