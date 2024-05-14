import React, { useState } from "react";
import { Button, IconButton, Modal, Paper, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ViewIcon from "@mui/icons-material/Visibility";

const ProfileModal = ({ user, children }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {children ? (
        <span onClick={handleOpen}>{children}</span>
      ) : (
        <IconButton onClick={handleOpen} color="inherit">
          <ViewIcon />
        </IconButton>
      )}
      <Modal open={open} onClose={handleClose}>
        <Paper
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            padding: 20,
            backgroundColor: "#333", 
            color: "#fff", 
            borderRadius:10
          }}
        >
          <IconButton
            style={{ position: "absolute", top: 5, right: 5 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h4" align="center" gutterBottom>
            {user.name}
          </Typography>
          <div style={{ textAlign: "center" }}>
            <img
              src={user.pic}
              alt={user.name}
              style={{ borderRadius: "50%", width: 150, height: 150 }}
            />
            <Typography variant="h6" gutterBottom>
              Email: {user.email}
            </Typography>
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="secondary" 
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </Paper>
      </Modal>
    </>
  );
};

export default ProfileModal;
