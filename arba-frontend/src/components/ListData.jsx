import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { baseUrl } from "../main";
import EditCategory from "./EditCategory";
import EditProduct from "./EditProduct";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell>{isProduct ? "Title" : "Name"}</StyledTableCell>
            <StyledTableCell>{isProduct ? "Price" : "Slug"}</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <StyledTableRow key={item._id}>
              <StyledTableCell>
                <img src={item.image} width="50px" height="50px" />
              </StyledTableCell>
              <StyledTableCell>
                {isProduct ? item.title : item.name}
              </StyledTableCell>
              <StyledTableCell>
                {isProduct ? item.price : item.slug}
              </StyledTableCell>
              <StyledTableCell>
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
              </StyledTableCell>
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
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
