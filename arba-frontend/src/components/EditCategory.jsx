import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { baseUrl } from "../main";
import UploadForm from "./ImageUpload";

const style = {
  textTransform: "none",
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
  textTransform: "none",
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

export default function EditCategory({ open, handleClose, item, fetchDatas }) {
  const [data, setData] = useState({});

  useEffect(() => {
    setData({
      id: item._id,
      slug: item.slug,
      image: item.image,
      name: item.name,
    });
  }, [item]);

  const setImage = (val) => {
    setData((prev) => ({
      ...prev,
      image: val,
    }));
  };

  const setValues = (e, key) => {
    setData({
      ...data,
      [key]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editCategory();
  };

  const editCategory = async () => {
    try {
      let res = await fetch(`${baseUrl}/category/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      res = await res.json();
      fetchDatas();
      handleClose();
      setData({
        id: "",
        slug: "",
        image: "",
        name: "",
      });
    } catch (e) {
      console.log("err", e.message);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
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
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              value={data.name}
              onChange={(e) => setValues(e, "name")}
            />
            <TextField
              sx={textField}
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="slug"
              label="slug"
              name="slug"
              autoFocus
              value={data.slug}
              onChange={(e) => setValues(e, "slug")}
            />
            <UploadForm setData={setData} setImage={setImage} />
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
              Update Category
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
