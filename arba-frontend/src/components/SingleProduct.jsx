import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCarts } from "../store/cartSlice";

const buttonStyle = {
  mt: "1rem",
  backgroundColor: "#00AAC3",
  boxShadow: "0",
  borderRadius: "0",
  "&:hover": {
    backgroundColor: "#00AAC3",
    boxShadow: "none",
  },
};

function SingleProduct({ item }) {
  const { title, description, price, image } = item;

  const [isAdded, setIsAdded] = useState(false);
  const [count, setCount] = useState(0);

  const { carts } = useSelector((store) => store.carts);

  const dispatch = useDispatch();

  const incrementCart = () => {
    let f = carts?.filter((c) => c._id == item._id);
    let all = carts?.filter((c) => c._id !== item._id);
    let obj = { ...f[0], count: f[0].count + 1 };
    all.push(obj);
    dispatch(setCarts(all));
  };

  const decrementCart = () => {
    let f = carts?.filter((c) => c._id == item._id);
    let all = carts?.filter((c) => c._id !== item._id);

    if (f[0].count >= 1) {
      let obj = { ...f[0], count: f[0].count - 1 };
      all.push(obj);
    }
    dispatch(setCarts(all));
  };

  const handleAddToCart = () => {
    let all = carts?.filter((c) => c._id !== item._id);
    let obj = { ...item, count: 1 };
    all.push(obj);
    dispatch(setCarts(all));
  };

  useEffect(() => {
    if (!Array.isArray(carts)) return;
    let f = carts?.filter((c) => c._id == item._id);
    if (f.length > 0) {
      setCount(f[0].count);
      setIsAdded(true);
    }
    if (f[0] && f[0].count == 0) {
      let all = carts.filter((c) => c._id !== f[0]._id);
      dispatch(setCarts(all));
      setIsAdded(false);
    }
  }, [carts, incrementCart]);

  return (
    <Box sx={{ position: "relative" }}>
      <Card
        sx={{
          boxShadow: "none",
          // border: "1px solid lightgray",
          borderRadius: "0",
        }}
      >
        <CardMedia component="img" height="200" image={image} alt={title} />
        <CardContent
          sx={{
            height: "10rem",
            border: "0",
            boxShadow: "0",
          }}
        ></CardContent>
      </Card>
      <Box
        sx={{
          position: "absolute",
          bottom: 25,
          backgroundColor: "white",
          left: 15,
          width: "90%",
          padding: "1rem",
          boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body1" color="text.primary">
          Price: {price}
        </Typography>
        {!isAdded && (
          <Button
            fullWidth
            onClick={handleAddToCart}
            variant="contained"
            color="primary"
            sx={buttonStyle}
          >
            Add to Cart
          </Button>
        )}

        {isAdded && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              fullWidth
              onClick={decrementCart}
              variant="contained"
              color="primary"
              sx={buttonStyle}
            >
              -
            </Button>
            <span
              style={{
                fontWeight: "bold",
                marginInline: "1rem",
              }}
            >
              {count}
            </span>
            <Button
              fullWidth
              onClick={incrementCart}
              variant="contained"
              color="primary"
              sx={buttonStyle}
            >
              +
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default SingleProduct;
