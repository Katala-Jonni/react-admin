import React, { Component, Fragment } from "react";
import propTypes from "prop-types";
import moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

class Popup extends Component {
  state = {};

  handleClick = () => {
    this.setState({
      calendarOverlay: true,
      currentTitleData: {}
    });
  };

  render() {
    const { description, target, events } = this.props;
    console.log(events);
    return (
      <Fragment>
        <Dialog
          maxWidth="sm"
          scroll="body"
          aria-labelledby="max-width-dialog-title"
          open={true}
        >
          <DialogTitle id="max-width-dialog-title">
            {`${description}`}
          </DialogTitle>
          <DialogContent>
            <span
              className="ml-2"
              role="presentation"
              onClick={this.handleClick}>
              Еще {target}
            </span>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

Popup.defaultProps = {
  description: "Все записи на этот день"
};

Popup.propTypes = {
  description: propTypes.string
};

export default Popup;
