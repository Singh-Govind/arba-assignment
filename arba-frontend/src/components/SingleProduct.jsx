import { Typography, Button, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCarts } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

const buttonStyle = {
  backgroundColor: "custom.main",
  fontWeight: "400",
  textTransform: "none",
  borderRadius: "20px",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "custom.secondary",
    boxShadow: "none",
  },
};

function SingleProduct2({ item }) {
  const { title, description, price, image } = item;

  const [isAdded, setIsAdded] = useState(false);
  const [count, setCount] = useState(0);

  const { carts } = useSelector((store) => store.carts);

  const navigate = useNavigate();

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
    <Box
      sx={{
        border: "1px solid lightgray",
        borderRadius: "5px",
        "&:hover": {
          transform: "scale(1.05)",
          transition: "0.8s",
        },
      }}
    >
      <Box>
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            maxHeight: "150px",
            borderRadius: "5px",
          }}
          src={image}
          alt={title}
        />
      </Box>
      <Box
        sx={{
          padding: "0.5rem 0.25rem",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.3rem",
          }}
          component="h2"
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.8rem",
            color: "gray",
            padding: "0 0.21rem",
          }}
        >
          <Typography>{description}</Typography>
          <Typography>Rs. {price}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "0.5rem",
          }}
        >
          {!isAdded && (
            <>
              <Button
                onClick={handleAddToCart}
                sx={buttonStyle}
                variant="contained"
              >
                Add to Card
              </Button>
              <Button
                onClick={() => {
                  handleAddToCart();
                  navigate("/carts");
                }}
                sx={buttonStyle}
                variant="contained"
              >
                Buy Now
              </Button>
            </>
          )}
          {isAdded && (
            <>
              <Button
                onClick={decrementCart}
                sx={buttonStyle}
                variant="contained"
              >
                -
              </Button>
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {count}
              </span>
              <Button
                onClick={incrementCart}
                sx={buttonStyle}
                variant="contained"
              >
                +
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default SingleProduct2;
