import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import AddEventsForm from "./Forms/AddEventsForm";

const styles = () => ({
  bottom: {
    marginBottom: "200px"
  },
  mBottom: {
    marginBottom: "30px"
  }
});

class AddEvents extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClickClose = () => {
    this.setState({ open: false });
  };


  render() {
    const { classes, title, description } = this.props;
    return (
      <Fragment>
        <Tooltip title={title}>
          <Fab
            variant="extended"
            color="secondary"
            className={classes.button}
            onClick={this.handleClickOpen}
          >
            <AddIcon/>
          </Fab>
        </Tooltip>
        <Dialog
          maxWidth={"sm"}
          open={this.state.open}
          onClose={this.handleClose}
          scroll="body"
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">
            {description}
          </DialogTitle>
          <DialogContent>
            <AddEventsForm
              onSubmit={(values, ...rest) => console.log(values, "---onSubmit---")}
              handleClickClose={this.handleClickClose}
            />
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

AddEvents.defaultProps = {
  title: "Записать",
  description: "Форма записи Клиента"
};

AddEvents.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  description: PropTypes.string
};

export default withStyles(styles)(AddEvents);
