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
import moment from "moment";

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

  handleSubmit = values => {
    // console.log(values, "---onSubmit---");
    let idList = this.props.events.map(a => a.id);
    const { lastName, surname, phoneNumber } = values;
    // console.log(values.members);
    // console.log(this.props);
    let count = 1;
    const hours = values.members.map(item => {
      let newId = Math.max(...idList) + (++count);
      const start = moment(item.date).set({ "hour": moment(item.start).hour(), "minute": moment(item.start).minute() });
      const end = moment(item.date).set({ "hour": moment(item.end).hour(), "minute": moment(item.end).minute() });
      return {
        id: newId,
        title: `${item.title} - ${lastName} ${surname}`,
        start: start._d,
        end: end._d,
        date: moment(item.date).format(),
        resourceId: item.resourceId,
        lastName,
        surname,
        titleEvent: item.title,
        phoneNumber
      };
    });
    // let newId = Math.max(...idList) + 1;
    // let hour = {
    //   id: newId,
    //   title: "New Event",
    //   allDay: values.slots.length == 1,
    //   start: values.start,
    //   end: values.end,
    //   resourceId: values.resourceId
    // };

    // валидация времени добавления записи, не может добавляться, если запись в прошлом
    // валидация времени больше 20, запись невозможна, так как работа до 20
    // валидация в сравнении, если end меньше start, то запись невозможна
    // валидация времени записи меньше 10, запись невозможна
    console.log(hours);
    this.props.editEvents(this.props.events.concat([...hours]));
    this.handleClickClose();
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
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  description: PropTypes.string
};

export default withStyles(styles)(AddEvents);
