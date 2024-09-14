export interface IAlertMessage {
  message: string;
  severity: "success" | "error" | "warning" | "info";
  variant?: "filled" | "standard" | "outlined";
  open: boolean;
  handleClose: () => void;
}
