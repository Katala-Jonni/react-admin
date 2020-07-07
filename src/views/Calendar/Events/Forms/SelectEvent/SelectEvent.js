import React, { Component, Fragment } from "react";
import propTypes from "prop-types";
import moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SelectEventForm from "./SelectEventForm";

class SelectEvent extends Component {
  state = {
    open: false,
    isButton: true,
    initialValues: {
      ...this.props.selectEventValue
    }
  };

  switchButton = bool => {
    this.setState({
      isButton: bool
    });
  };

  deleteEvents = (_id) => {
    const { deleteEvents } = this.props;
    deleteEvents(_id);
  };

  handleSubmit = values => {
    // копипаст с добавления записи
    const { handleClickCloseSelectEvent, updateEvents, addEvents, place } = this.props;
    const { lastName, surname, phoneNumber, _id } = values;
    const members = values.members.map(item => {
      const milliseconds = moment(item.date).startOf("day");
      const start = moment(item.date).set({ "hour": moment(item.start).hour(), "minute": moment(item.start).minute() });
      const end = moment(item.date).set({ "hour": moment(item.end).hour(), "minute": moment(item.end).minute() });
      return {
        title: `${item.title} - ${lastName} ${surname}`,
        start: start._d,
        end: end._d,
        date: start._d,
        resourceId: item.resourceId.value || item.resourceId,
        titleEvent: item.title,
        milliseconds: milliseconds.valueOf()
      };
    });

    const event = Object.assign({}, { ...members[0] }, { lastName, surname, phoneNumber });
    if (_id) {
      Object.assign(event, { _id }, { place });
      updateEvents(event);
    } else {
      Object.assign(event, { place });
      addEvents({ event, place });
    }

    this.switchButton(false);
    return handleClickCloseSelectEvent();
  };

  handleClickClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      description,
      selectEventValue,
      events,
      formRedux,
      isNewEvent,
      open,
      handleClickCloseSelectEvent
    } = this.props;
    return (
      <Fragment>
        <Dialog
          maxWidth="sm"
          scroll="body"
          aria-labelledby="max-width-dialog-title"
          open={open}
        >
          <DialogTitle id="max-width-dialog-title">
            {`${description}`}
          </DialogTitle>
          <DialogContent>
            <SelectEventForm
              isButton={this.state.isButton}
              fields={selectEventValue}
              isNewEvent={isNewEvent}
              formReduxValues={formRedux && formRedux.values ? formRedux.values : {}}
              isIdentical={events.find(a => a.id === selectEventValue.id) === selectEventValue}
              switchButton={this.switchButton}
              deleteEvents={this.deleteEvents}
              onSubmit={this.handleSubmit}
              handleClickClose={handleClickCloseSelectEvent}
            />
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

SelectEvent.defaultProps = {
  description: "Форма записи Клиента",
  selectEventValue: {}
};

SelectEvent.propTypes = {
  description: propTypes.string,
  selectEventValue: propTypes.object,
  events: propTypes.arrayOf(propTypes.object),
  formRedux: propTypes.object,
  isNewEvent: propTypes.bool,
  open: propTypes.bool,
  handleClickCloseSelectEvent: propTypes.func,
  deleteEvents: propTypes.func.isRequired,
  editEvents: propTypes.func.isRequired
};

export default SelectEvent;
