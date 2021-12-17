import React, { useContext } from "react";
import SnackBar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { Context } from "../../App";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "18px",
    letterSpacing: "0.47px",
    lineHeight: "1.43",
    width: "50%",
    alignItems: "center",
    display: "flex",
    height: "48px",
  },
  customSize: {
    width: "50%",
    display: "flex",
    top: "130px",
    zIndex: 50,
  },
}));

const Popup = () => {
  const { setPopupState, popupState } = useContext(Context);
  const customCss = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setPopupState({
      type: "setPopup",
      payload: { show: false, message: "", type: "" },
    });
  };

  return (
    <SnackBar
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      open={popupState.show}
      autoHideDuration={1500}
      disableWindowBlurListener
      onClose={handleClose}
      className={customCss.customSize}
    >
      <Alert
        className={customCss.root}
        onClose={handleClose}
        severity={popupState.type}
        variant="filled"
        elevation={3}
        open={popupState.show}
      >
        {popupState.message}
      </Alert>
    </SnackBar>
  );
};

export default Popup;
