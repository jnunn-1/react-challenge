import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            width: 45,
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          &times;
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function Modal({
  open,
  setOpen,
  userSelections,
  setUserSelections,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Results
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {Object.keys(userSelections).map((key) => {
            return (
              <Container sx={{ py: 2 }} maxWidth="lg">
                <Typography gutterBottom>
                  Award for the category <strong>{dashToTitleCase(key)}</strong>
                </Typography>
                <Typography gutterBottom>
                  goes to{" "}
                  <strong>{dashToTitleCase(userSelections[key])}</strong>
                </Typography>
              </Container>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              handleClose();
              setUserSelections({});
            }}
          >
            Reset All
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

function dashToTitleCase(str) {
  if (str) {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return str;
}
