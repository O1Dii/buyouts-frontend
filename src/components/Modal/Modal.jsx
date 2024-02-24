import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export default function MyModal({open, onClose, title, children}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography>
          <strong>
            {title}
          </strong>
        </Typography>
        {children}
      </Box>
    </Modal>
  );
}
