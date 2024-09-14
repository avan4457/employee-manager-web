"use client";
import { IAlertMessage } from "@/utils/interfaces/IAlertMessage";
import { Alert, Snackbar } from "@mui/material";

export default function AlertMessage({
  message,
  severity,
  variant,
  open,
  handleClose,
}: IAlertMessage) {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity}
        variant={variant || "standard"}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
