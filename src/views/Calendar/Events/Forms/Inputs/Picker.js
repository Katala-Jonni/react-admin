import "date-fns";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from "material-ui-pickers";
import "moment/locale/ru";

class MaterialUIPickers extends React.Component {
  render() {
    const { classes, isEnd, isTime, input, meta: { touched, error }, onChange, onOpen, onClose, ...rest } = this.props;
    // console.log(touched, error);
    return (
      <Fragment>{
        isTime
          ? <TimePicker
            // disabled
            ampm={false}
            autoOk // автоматический выбор
            margin="normal"
            label={isEnd ? "Конечное время" : "Начальное время"}
            minutesStep={5}
            minDate={new Date()}
            cancelLabel="Отмена"
            invalidLabel='Не указано'
            invalidDateMessage={`Укажите ${isEnd ? "конечное время" : "начальное время"}`}
            {...input}
            // value={input.value || new Date()}
          />
          : <DatePicker
            // disabled
            margin="normal"
            onChange={onChange}
            label="Выберите дату"
            minDate={new Date()}
            format="DD/MM/YYYY"
            autoOk // автоматический выбор
            variant="outlined"
            cancelLabel="Отмена"
            showTodayButton
            todayLabel="Сегодня"
            invalidLabel={"Не указана"}
            invalidDateMessage={"Выберите дату"}
            onOpen={onOpen}
            onClose={onClose}
            {...input}
            // value={input.value || new Date()}
          />
      }</Fragment>
    );
  }
}

MaterialUIPickers.propTypes = {
  // classes: PropTypes.object.isRequired
};

export default MaterialUIPickers;


// import "date-fns";
// import React from "react";
// import PropTypes from "prop-types";
// import Grid from "@material-ui/core/Grid";
// import { withStyles } from "@material-ui/core/styles";
// import MomentUtils from "@date-io/moment";
// import { MuiPickersUtilsProvider, TimePicker, DatePicker } from "material-ui-pickers";
// import moment from "moment";
// import "moment/locale/ru";
//
// const styles = {
//   grid: {
//     width: "100%"
//   }
// };
//
// class MaterialUIPickers extends React.Component {
//   state = {
//     selectedDate: new Date()
//   };
//
//   handleDateChange = date => {
//     this.setState({ selectedDate: date });
//   };
//
//   render() {
//     const { classes } = this.props;
//     const { selectedDate } = this.state;
//     return (
//       <MuiPickersUtilsProvider utils={MomentUtils} libInstance={moment}>
//         <Grid container className={classes.grid} justify="space-between">
//           <DatePicker
//             // disabled
//             margin="normal"
//             onChange={this.handleDateChange}
//             label="Выберите дату"
//             value={selectedDate}
//             minDate={new Date()}
//             format="DD/MM/YYYY"
//             autoOk // автоматический выбор
//             variant="outlined"
//             cancelLabel="Отмена"
//             showTodayButton
//             todayLabel="Сегодня"
//             // animateYearScrolling
//           />
//           <TimePicker
//             // disabled
//             ampm={false}
//             autoOk // автоматический выбор
//             margin="normal"
//             label="Начальное время"
//             value={selectedDate}
//             minutesStep={5}
//             minDate={selectedDate}
//             onChange={this.handleDateChange}
//             cancelLabel="Отмена"
//           />
//           <TimePicker
//             // disabled
//             ampm={false}
//             autoOk // автоматический выбор
//             margin="normal"
//             label="Конечное время"
//             value={selectedDate}
//             minutesStep={5}
//             minDate={selectedDate}
//             onChange={this.handleDateChange}
//             cancelLabel="Отмена"
//           />
//         </Grid>
//       </MuiPickersUtilsProvider>
//     );
//   }
// }
//
// MaterialUIPickers.propTypes = {
//   classes: PropTypes.object.isRequired
// };
//
// export default withStyles(styles)(MaterialUIPickers);
