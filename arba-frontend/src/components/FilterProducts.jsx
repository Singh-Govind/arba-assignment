import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../main";
import { setProducts } from "../store/productSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", md: 500 },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const textField = {
  "& .MuiInput-underline:before": {
    borderBottom: `2px solid custom.main`,
  },
  "& .MuiInput-underline:after": {
    borderBottom: `2px solid custom.main`,
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottom: `2px solid custom.main`,
  },
};

const buttonStyle = {
  textTransform: "none",
  backgroundColor: "custom.main",
  padding: "0.1rem 3rem",
  color: "white",
  boxShadow: "0",
  borderRadius: "0",
  "&:hover": {
    backgroundColor: "custom.secondary",
    boxShadow: "none",
  },
};

export default function FilterProducts({ open, handleClose }) {
  const { categories } = useSelector((store) => store.categories);
  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const [data, setData] = useState({
    title: "",
    categoryName: "",
    sortOrder: "",
  });

  const setValues = (e, key) => {
    setData({
      ...data,
      [key]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let url = "";
    for (let key in data) {
      if (data[key] === "") continue;
      if (url === "") {
        url += `?${[key]}=${data[key]}`;
      } else {
        url += `&${[key]}=${data[key]}`;
      }
    }

    search(url);
  };

  const search = async (url) => {
    try {
      let res = await fetch(`${baseUrl}/product/${user.id}${url}`);
      res = await res.json();
      console.log(res);
      if (res?.products) {
        dispatch(setProducts(res.products));
      }
      handleClose();
    } catch (e) {
      console.log("err", e.message);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Add Category
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              sx={textField}
              variant="standard"
              margin="normal"
              fullWidth
              id="title"
              label="Search by Title"
              name="title"
              autoFocus
              value={data.title}
              onChange={(e) => setValues(e, "title")}
            />

            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={data.categoryName}
              label="Age"
              onChange={(e) => setValues(e, "categoryName")}
            >
              {categories?.map((item) => (
                <MenuItem key={item._id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>

            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={data.sortOrder}
              label="Age"
              onChange={(e) => setValues(e, "sortOrder")}
            >
              <MenuItem value={"asc"}>asc</MenuItem>
              <MenuItem value={"desc"}>desc</MenuItem>
            </Select>

            <Button
              sx={{
                mt: "1rem",
                backgroundColor: "custom.main",
                padding: "0.1rem 3rem",
                color: "white",
                boxShadow: "0",
                borderRadius: "0",
                "&:hover": {
                  backgroundColor: "custom.secondary",
                  boxShadow: "none",
                },
              }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
            >
              Search
            </Button>
          </form>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              marginTop: "2rem",
              justifyContent: "space-around",
            }}
          >
            <Button onClick={handleClose} sx={buttonStyle}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
