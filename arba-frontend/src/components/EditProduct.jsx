import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { baseUrl } from "../main";
import UploadForm from "./ImageUpload";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const textField = {
  "& .MuiInput-underline:before": {
    borderBottom: `2px solid #00AAC3`,
  },
  "& .MuiInput-underline:after": {
    borderBottom: `2px solid #00AAC3`,
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottom: `2px solid #00AAC3`,
  },
};

const buttonStyle = {
  mt: "1rem",
  backgroundColor: "#00AAC3",
  padding: "0.1rem 3rem",
  color: "white",
  boxShadow: "0",
  borderRadius: "0",
  "&:hover": {
    backgroundColor: "#00AAC3",
    boxShadow: "none",
  },
};

export default function EditProduct({ open, handleClose, item, fetchDatas }) {
  const { categories } = useSelector((store) => store.categories);
  const { user } = useSelector((store) => store.user);

  const [data, setData] = useState({
    title: item.title,
    description: item.description,
    image: item.image,
    price: item.price,
    categoryId: item.categoryId,
    ownerId: user.id,
  });

  useEffect(() => {
    setData({
      title: item.title,
      description: item.description,
      image: item.image,
      price: item.price,
      categoryId: item.categoryId,
      ownerId: user.id,
    });
  }, [item]);

  const setValues = (e, key) => {
    setData({
      ...data,
      [key]: e.target.value,
    });
  };

  const setImage = (val) => {
    setData((prev) => ({
      ...prev,
      image: val,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateProduct();
  };

  const updateProduct = async () => {
    try {
      let res = await fetch(`${baseUrl}/product/update/${item._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      res = await res.json();
      fetchDatas();
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
            Add Product
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              sx={textField}
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoFocus
              value={data.title}
              onChange={(e) => setValues(e, "title")}
            />
            <TextField
              sx={textField}
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="description"
              label="description"
              name="description"
              autoFocus
              value={data.description}
              onChange={(e) => setValues(e, "description")}
            />
            <UploadForm setImage={setImage} />
            <TextField
              sx={textField}
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="image"
              label="image"
              name="image"
              autoFocus
              disabled={true}
              value={data.image}
              onChange={(e) => setValues(e, "image")}
            />
            <TextField
              sx={textField}
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="price"
              label="price"
              name="price"
              autoFocus
              value={data.price}
              onChange={(e) => setValues(e, "price")}
            />
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={data.categoryId}
              label="Age"
              onChange={(e) => setValues(e, "categoryId")}
            >
              {categories?.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            <Button
              sx={{
                mt: "1rem",
                backgroundColor: "#00AAC3",
                color: "white",
                boxShadow: "0",
                borderRadius: "0",
                "&:hover": {
                  backgroundColor: "#00AAC3",
                  boxShadow: "none",
                },
              }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
            >
              Update Product
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
