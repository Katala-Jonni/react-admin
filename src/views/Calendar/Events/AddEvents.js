import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import AddEventsForm from "./Forms/AddEventsForm";
import moment from "moment";

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

  handleSubmit = values => {
    const { lastName, surname, phoneNumber } = values;
    const events = values.members.map(item => {
      const milliseconds = moment(item.date).startOf("day");
      const start = moment(item.date).set({ "hour": moment(item.start).hour(), "minute": moment(item.start).minute() });
      const end = moment(item.date).set({ "hour": moment(item.end).hour(), "minute": moment(item.end).minute() });
      return {
        title: `${item.title} - ${lastName} ${surname}`,
        start: start._d,
        end: end._d,
        date: start._d,
        resourceId: item.resourceId,
        titleEvent: item.title,
        lastName,
        surname,
        phoneNumber,
        milliseconds: milliseconds.valueOf()
      };
    });
    this.props.addEvents(events);
    this.handleClickClose();
  };

  render() {
    const { title, description } = this.props;
    return (
      <Fragment>
        <Tooltip title={title}>
          <Fab
            variant="extended"
            color="secondary"
            onClick={this.handleClickOpen}
          >
            <AddIcon/>
          </Fab>
        </Tooltip>
        <Dialog
          maxWidth="sm"
          scroll="body"
          aria-labelledby="max-width-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="max-width-dialog-title">
            {description}
          </DialogTitle>
          <DialogContent>
            <AddEventsForm
              onSubmit={this.handleSubmit}
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
  title: PropTypes.string,
  description: PropTypes.string,
  events: PropTypes.array.isRequired,
  changeMasters: PropTypes.func.isRequired,
  editMastersStart: PropTypes.func.isRequired,
  editEvents: PropTypes.func.isRequired
};

export default AddEvents;
