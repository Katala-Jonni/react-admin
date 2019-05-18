import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import moment from "moment/moment";


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
    open: false,
    fullWidth: true,
    maxWidth: "sm",
    color: "primary",
    value: [],
    editValue: null
  };

  handleClickOpen = () => {
    this.setState({ open: true, value: [] });
  };

  handleClose = () => {
    this.setState({ open: false, color: "primary", value: [] });
  };

  handleAdd = () => {
    this.handleClose();
    // this.state.value && this.state.value.length && this.props.changeMasters({
    //   date: moment(this.props.date).format("DD.MM.YY"),
    //   totalResource: this.props.totalResource,
    //   value: this.state.value
    // });

    this.setState({
      value: []
    });
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
            Привет
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleAdd}
              color={this.state.color}
              variant="contained"
            >
              {title}
            </Button>
          </DialogActions>
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
