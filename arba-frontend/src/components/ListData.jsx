import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { baseUrl } from "../main";
import EditCategory from "./EditCategory";
import EditProduct from "./EditProduct";

const borderStyle = {
  border: "1px solid rgba(0, 0, 0, 1)",
};

const spanStyle = {
  fontWeight: "bold",
  cursor: "pointer",
  marginInline: "0.5rem",
};

export default function ListData({ data, isProduct = false, fetchDatas }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (editData.name || editData.title) {
      handleOpen();
    }
  }, [editData]);

  const deleteData = async (id) => {
    if (isProduct) {
      let res = await fetch(`${baseUrl}/product`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: [id] }),
      });
      res = res.json();
      fetchDatas();
    } else {
      let res = await fetch(`${baseUrl}/category/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      res = res.json();
      fetchDatas();
    }
  };

  return (
    <TableContainer
      sx={{ borderRadius: "0", boxShadow: "0" }}
      component={Paper}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#4b95d4",
            }}
          >
            <TableCell sx={borderStyle}>Image</TableCell>
            <TableCell sx={borderStyle}>
              {isProduct ? "Title" : "Name"}
            </TableCell>
            <TableCell sx={borderStyle}>
              {isProduct ? "Price" : "Slug"}
            </TableCell>
            <TableCell sx={borderStyle}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item._id}
              sx={{ border: "1px solid rgba(0, 0, 0, 0.12)" }}
            >
              <TableCell sx={borderStyle}>
                <img src={item.image} width="50px" height="50px" />
              </TableCell>
              <TableCell sx={borderStyle}>
                {isProduct ? item.title : item.name}
              </TableCell>
              <TableCell sx={borderStyle}>
                {isProduct ? item.price : item.slug}
              </TableCell>
              <TableCell sx={borderStyle}>
                <span
                  onClick={() => {
                    setEditData(item);
                    // handleOpen();
                  }}
                  style={spanStyle}
                >
                  Edit
                </span>{" "}
                |{" "}
                <span style={spanStyle} onClick={() => deleteData(item._id)}>
                  Delete
                </span>
              </TableCell>
              {isProduct ? (
                <EditProduct
                  open={open}
                  handleClose={handleClose}
                  item={editData}
                  fetchDatas={fetchDatas}
                />
              ) : (
                <EditCategory
                  item={editData}
                  open={open}
                  handleClose={handleClose}
                  fetchDatas={fetchDatas}
                />
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
