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

  deleteEvents = () => {
    const { events, selectEventValue, deleteEvents } = this.props;
    deleteEvents({
      events,
      selectEventValue
    });
  };

  handleSubmit = values => {
    // копипаст с добавления записи
    const { selectEventValue, handleClickCloseSelectEvent, events } = this.props;
    const newEventsList = events.filter(a => a.id !== selectEventValue.id);
    const { lastName, surname, phoneNumber } = values;
    const hours = values.members.map(item => {
      const start = moment(item.date).set({ "hour": moment(item.start).hour(), "minute": moment(item.start).minute() });
      const end = moment(item.date).set({ "hour": moment(item.end).hour(), "minute": moment(item.end).minute() });
      return {
        id: selectEventValue.id,
        title: `${item.title} - ${lastName} ${surname}`,
        start: start._d,
        end: end._d,
        date: moment(item.date).format(),
        resourceId: item.resourceId.value || item.resourceId,
        titleEvent: item.title,
        lastName,
        surname,
        phoneNumber
      };
    });

    this.props.editEvents(newEventsList.concat([...hours]));
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
