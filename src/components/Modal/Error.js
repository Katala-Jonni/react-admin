import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const style = theme => ({
  root: {
    height: 300,
    flexGrow: 1,
    minWidth: 300,
    transform: "translateZ(0)",
    // The position fixed scoping doesn't work in IE 11.
    // Disable this demo to preserve the others.
    "@media all and (-ms-high-contrast: none)": {
      display: "none"
    }
  },
  modal: {
    display: "flex",
    padding: theme.spacing.unit,
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit
    // padding: theme.spacing(2, 4, 3)
  }
});

const ServerModal = (props) => {
  const { classes, title, description } = props;

  return (
    <div className={classes.root}>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        className={classes.modal}
        // container={() => rootRef.current}
      >
        <div className={classes.paper}>
          <h2 id="server-modal-title">{title}</h2>
          <p id="server-modal-description">{description}</p>
        </div>
      </Modal>
    </div>
  );
};

ServerModal.defaultProps = {
  title: "Ошибка сервера!",
  description: "Проверьте соединение с интернетом и перезагрузите страницу"
};

ServerModal.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string
};

export default withStyles(style)(ServerModal);
