import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../main";
import { setCategories } from "../store/categorySlice";

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
  textTransform: "none",
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

export default function FilterCategory({ open, handleClose }) {
  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: "",
    slug: "",
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
      let res = await fetch(`${baseUrl}/category/${user.id}${url}`);
      res = await res.json();
      console.log(res);
      if (res?.categories) {
        dispatch(setCategories(res.categories));
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
              id="name"
              label="Search by Name"
              name="name"
              autoFocus
              value={data.name}
              onChange={(e) => setValues(e, "name")}
            />

            <TextField
              sx={textField}
              variant="standard"
              margin="normal"
              fullWidth
              id="slug"
              label="Search by Slug"
              name="slug"
              autoFocus
              value={data.slug}
              onChange={(e) => setValues(e, "slug")}
            />

            <Button
              sx={{
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
