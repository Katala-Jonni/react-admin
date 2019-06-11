import React, { Component, Fragment } from "react";
import propTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SelectEventForm from "./SelectEventForm";
import moment from "moment";

class SelectEvent extends Component {
  state = {
    open: false,
    isButton: true,
    changeValues: {
      ...this.props.selectEventValue
    },
    initialValues: {
      ...this.props.selectEventValue
    }
  };

  switchButton = bool => {
    this.setState({
      isButton: bool
    });
  };

  handleSubmit = values => {
    console.log(values);
    // console.log(this.state.isButton);
    // if (!this.state.isButton) {
    //   return;
    // }
    // console.log(values);
    const { member, ...rest } = values;
    // const data = { ...member[0], ...rest };
    // console.log(this.props.selectEventValue);
    // console.log(values);

    ////// копипаст с добавления записи


    // console.log(values, "---onSubmit---");
    const { selectEventValue, handleClickCloseSelectEvent, events } = this.props;
    let idList = events.find(a => a.id === selectEventValue.id);
    if (!idList) {
      return handleClickCloseSelectEvent();
    }
    // console.log(idList);
    const newEventsList = events.filter(a => a.id !== selectEventValue.id);
    const { lastName, surname, phoneNumber } = values;
    const hours = values.members.map(item => {
      const start = moment(item.date).set({ "hour": moment(item.start).hour(), "minute": moment(item.start).minute() });
      const end = moment(item.date).set({ "hour": moment(item.end).hour(), "minute": moment(item.end).minute() });
      return {
        id: idList.id,
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
    console.log(hours);
    this.props.editEvents(newEventsList.concat([...hours]));
    this.switchButton(false);
    // this.props.editEvents(this.props.events.concat([...hours]));
    return handleClickCloseSelectEvent();
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClickClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { description, open, handleClickCloseSelectEvent, selectEventValue, events, formRedux } = this.props;
    // console.log(selectEventValue);
    // console.log(this.state.values);
    // console.log(formRedux);
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
              switchButton={this.switchButton}
              isButton={this.state.isButton}
              formReduxValues={formRedux && formRedux.values ? formRedux.values : {}}
              isIdentical={events.find(a => a.id === selectEventValue.id) === selectEventValue}
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
