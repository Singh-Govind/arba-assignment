import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";

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

export default function TC({ open, handleClose }) {
  const acceptTC = () => {
    localStorage.setItem("isTcAccepted", true);
    handleClose();
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
            Terms & Conditions
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            sapiente, ut sed totam, possimus ducimus consequatur amet quia ad
            perferendis praesentium fugit error cumque itaque, illo excepturi
            tempora nulla velit? Dolor nostrum odio amet doloribus laborum aut
            necessitatibus dolorum fugit dolore iste, tempore magni, libero
            voluptatem quae suscipit ipsum. Quidem!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            sapiente, ut sed totam, possimus ducimus consequatur amet quia ad
            perferendis praesentium fugit error cumque itaque, illo excepturi
            tempora nulla velit? Dolor nostrum odio amet doloribus laborum aut
            necessitatibus dolorum fugit dolore iste, tempore magni, libero
            voluptatem quae suscipit ipsum. Quidem!
          </Typography>

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
            <Button onClick={acceptTC} sx={buttonStyle}>
              Accept
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
