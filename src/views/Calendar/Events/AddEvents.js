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
      const convert = moment(item.date).format("YYYY-MM-DD");
      // console.log(convert);
      // console.log(moment(item.date).hour(moment(item.start).hour()));
      // console.log(moment(item.date).set({ "hour": moment(item.start).hour(), "minute": moment(item.start).minute() }));
      // moment(item.date).set({'hour': moment(item.start).hour(), 'minute': moment(item.start).minute()});
      const start = moment(item.date).set({ "hour": moment(item.start).hour(), "minute": moment(item.start).minute() });
      const end = moment(item.date).set({ "hour": moment(item.end).hour(), "minute": moment(item.end).minute() });
      return {
        id: newId,
        title: `${lastName} ${surname} - ${item.title}, Номер телефона: ${phoneNumber}`,
        // allDay: values.slots.length == 1,
        // const d = moment(`${new Date(`${convert}`)}:T09:00:00.000Z`);
        start: start._d,
        // start: moment(item.start)._d,
        end: end._d,
        // end: moment(item.end)._d,
        // start: moment(item.start).format("YYYY-MM-DDThh:mm:ss.000Z"),
        // end: moment(item.end).format("YYYY-MM-DDThh:mm:ss.000Z"),
        resourceId: item.resourceId
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


    // при множественном выборе записей, открывается окно удаляется селект
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
