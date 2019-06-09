import React, { Component, Fragment } from "react";
import propTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SelectEventForm from "./SelectEventForm";
import moment from "moment";

class SelectEvent extends Component {
  state = {
    open: false
  };

  handleSubmit = (values, ...rest) => {
    console.log(values);
    console.log(rest);
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClickClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { description, open, handleClickCloseSelectEvent, selectEventValue } = this.props;
    // console.log(selectEventValue);
    return (
      <Fragment>
        <Dialog
          maxWidth={"sm"}
          open={this.props.open}
          onClose={this.handleClose}
          scroll="body"
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">
            {`${description} - ФИО Клиента`}
          </DialogTitle>
          <DialogContent>
            <SelectEventForm
              onSubmit={this.handleSubmit}
              handleClickClose={handleClickCloseSelectEvent}
              fields={selectEventValue}
            />
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

SelectEvent.defaultProps = {
  description: "Карточка записи"
};

export default SelectEvent;
