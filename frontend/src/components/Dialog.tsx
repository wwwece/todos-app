import React from "react";
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

interface Props {
  title: string;
  open: boolean;
  onAction: () => void;
  onClose: () => void;
  children?: React.ReactNode;
}

const Dialog: React.FC<Props> = ({
  title,
  open,
  onClose,
  onAction,
  children,
}) => {
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onAction} color="primary">
          Done
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
