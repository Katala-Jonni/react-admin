import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import moment from "moment/min/moment-with-locales";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import Today from "@material-ui/icons/Today";
import Month from "@material-ui/icons/ViewWeek";
import CurrentCalendar from "@material-ui/icons/CalendarToday";
import Typography from "@material-ui/core/Typography";
import CircularIntegration from "./CircularIntegration";
import AddMaster from "./Masters";
import PersonAdd from "@material-ui/icons/PersonAdd";
import { connect } from "react-redux";
import { changeCalendar, closeWizard, getIsDay, getResource, openWizard } from "../../modules/Calendar";
import AddEvents from "./Events/index";

class CalendarToolBar extends Component {
  state = {
    isWizardView: false
  };


  onClickWizard = () => {
    console.log(this.props);
    this.props.openWizard();
  };

  isPrev = () => {
    // let isPrev;
    // console.log(props);
    if (this.props.view === "month") {
      return moment(this.props.date).month() <= moment().month();
    } else {
      return +moment(this.props.date).startOf("day") <= +moment().startOf("day");
    }
  };
  onClickNextMonth = () => this.props.onNavigate("NEXT", moment(this.props.date).toDate());
  onClickBackMonth = () =>
    !this.isPrev() && this.props.onNavigate("PREV", moment(this.props.date).toDate());

  onClickCurrentMonth = () => this.props.onNavigate("DATE", moment().toDate());
  onClickCurrentDate = () => this.props.onView("day");
  onClickMonth = () => {
    if (this.props.view === "month") {
      // console.log(view);
      return;
    }
    // console.log(isDay);
    // console.log(view);
    // удвлить из состояния и внизу
    // changeCalendar({ isDay: false });
    if (this.isPrev()) {
      this.props.onView("month");
      return this.props.onNavigate("DATE", moment().toDate());
    }
    return this.props.onView("month");

  };

  addEvents = evt => {
    console.log(evt);
    // this.setState({
    //   isWizardView: true
    // });
  };

  render() {
    const {
      classes,
      onNavigate,
      onView,
      date,
      label,
      view,
      onChangeResource,
      isChange,
      resource,
      onChangeState,
      isDay
    } = this.props;


    const mapView = {
      month: "месяц",
      day: "день"
    };

    const isAdd =
      this.props.view === "day" &&
      (moment(date) >= moment() || moment(date).date() === moment().date());
    return (
      <div className={classes.container}>
        <div>
          {isAdd ? <AddEvents classes={classes}/> : null}
          {isAdd ? <AddMaster date={date} classes={classes}/> : null}
          {isAdd && resource.length >= 2 ? <AddMaster isNew date={date} classes={classes}/> : null}
          <Tooltip title={`Текущий ${mapView[view] || ""}`}>
            <Fab
              onClick={this.onClickCurrentMonth}
              color={"primary"}
              variant="extended"
              className={classes.button}
              // className={isAdd ? classes.button : null}
            >
              <CurrentCalendar/>
            </Fab>
          </Tooltip>
          <Tooltip title={`Предыдущий ${mapView[view] || ""}`}>
            <Fab
              variant="extended"
              onClick={this.onClickBackMonth}
              color={this.isPrev() ? "default" : "primary"}
              // className={classNames(classes.button)}
            >
              <ArrowForwardIos
                color={this.isPrev() ? "disabled" : "inherit"}
                className={classes.rotate}
              />
            </Fab>
          </Tooltip>
          <Tooltip title={`Следующий ${mapView[view] || ""}`}>
            <Fab
              variant="extended"
              onClick={this.onClickNextMonth}
              color={"primary"}
              className={classNames(classes.button)}
            >
              <ArrowForwardIos/>
            </Fab>
          </Tooltip>
        </div>
        {/*{isAdd ? <CircularIntegration isChange={isChange}/> : null}*/}
        <Typography
          align={"center"}
          variant={view === "day" ? "title" : "h6"}
          color="inherit"
          className={classNames(classes.flexRight, classes.button)}
        >
          {view === "day" ? moment(date).format("dddd LL") : label}
        </Typography>
        <Tooltip title="Месяц">
          <Fab
            onClick={this.onClickMonth}
            variant="extended"
            color="primary"
            className={classNames(classes.button, classes.flexRight)}
          >
            <Month fontSize={"large"}/>
          </Fab>
        </Tooltip>
        {!isAdd ? <Tooltip title="День">
            <Fab
              onClick={this.onClickCurrentDate}
              variant="extended"
              color="primary"
              className={classNames(classes.button)}
            >
              <Today fontSize={"large"}/>
            </Fab>
          </Tooltip>
          : null
        }
      </div>
    );
  }
}

// const CalendarToolBar = props => {
//   // console.log(props, "CalendarToolBar");
//   const {
//     classes,
//     onNavigate,
//     onView,
//     date,
//     label,
//     view,
//     onChangeResource,
//     isChange,
//     resource,
//     onChangeState,
//     isDay
//   } = props;
//
//   // console.log(props);
//   // console.log(props);
//   let isPrev;
//   // console.log(props);
//   if (view === "month") {
//     isPrev = moment(date).month() <= moment().month();
//   } else {
//     isPrev = +moment(date).startOf("day") <= +moment().startOf("day");
//   }
//
//   const mapView = {
//     month: "месяц",
//     day: "день"
//   };
//
//   const onClickNextMonth = () => onNavigate("NEXT", moment(date).toDate());
//   const onClickBackMonth = () =>
//     !isPrev && onNavigate("PREV", moment(date).toDate());
//
//   const onClickCurrentMonth = () => onNavigate("DATE", moment().toDate());
//   const onClickCurrentDate = () => onView("day");
//   const onClickMonth = () => {
//     if (view === "month") {
//       // console.log(view);
//       return;
//     }
//     // console.log(isDay);
//     // console.log(view);
//     // удвлить из состояния и внизу
//     // changeCalendar({ isDay: false });
//     if (isPrev) {
//       onView("month");
//       return onNavigate("DATE", moment().toDate());
//     }
//     return onView("month");
//
//   };
//
//   const addEvents = evt => {
//     console.log(evt);
//     this.setState({
//       isWizardView: true
//     });
//   };
//   //onChangeResource={onChangeResource} resource={resource}
//   const isAdd =
//     view === "day" &&
//     (moment(date) >= moment() || moment(date).date() === moment().date());
//   return (
//     <div className={classes.container}>
//       <div>
//         {isAdd ? (
//           <Tooltip title="Записать">
//             <Fab
//               variant="extended"
//               color="secondary"
//               className={classes.button}
//               onClick={addEvents}
//             >
//               <AddIcon/>
//             </Fab>
//           </Tooltip>
//         ) : null}
//
//         {isAdd ? <AddMaster date={date}/> : null}
//         {isAdd && resource.length >= 2 ? <AddMaster isNew date={date}/> : null}
//         <Tooltip title={`Текущий ${mapView[view] || ""}`}>
//           <Fab
//             onClick={onClickCurrentMonth}
//             color={"primary"}
//             variant="extended"
//             className={classes.button}
//           >
//             <CurrentCalendar/>
//           </Fab>
//         </Tooltip>
//         <Tooltip title={`Предыдущий ${mapView[view] || ""}`}>
//           <Fab
//             variant="extended"
//             onClick={onClickBackMonth}
//             color={isPrev ? "default" : "primary"}
//             className={classNames(classes.button)}
//           >
//             <ArrowForwardIos
//               color={isPrev ? "disabled" : "inherit"}
//               className={classes.rotate}
//             />
//           </Fab>
//         </Tooltip>
//         <Tooltip title={`Следующий ${mapView[view] || ""}`}>
//           <Fab
//             variant="extended"
//             onClick={onClickNextMonth}
//             color={"primary"}
//             className={classNames(classes.button)}
//           >
//             <ArrowForwardIos/>
//           </Fab>
//         </Tooltip>
//       </div>
//       {isAdd ? <CircularIntegration isChange={isChange}/> : null}
//       <Typography
//         align={"center"}
//         variant={view === "day" ? "title" : "h6"}
//         color="inherit"
//         className={classNames(classes.flexRight, classes.button)}
//       >
//         {view === "day" ? moment(date).format("dddd LL") : label}
//       </Typography>
//       <Tooltip title="Месяц">
//         <Fab
//           onClick={onClickMonth}
//           variant="extended"
//           color="primary"
//           className={classNames(classes.button, classes.flexRight)}
//         >
//           <Month fontSize={"large"}/>
//         </Fab>
//       </Tooltip>
//       {!isAdd ? <Tooltip title="День">
//           <Fab
//             onClick={onClickCurrentDate}
//             variant="extended"
//             color="primary"
//             className={classNames(classes.button)}
//           >
//             <Today fontSize={"large"}/>
//           </Fab>
//         </Tooltip>
//         : null
//       }
//     </div>
//   );
// };

CalendarToolBar.propTypes = {
  classes: PropTypes.object.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
  // onChangeResource: PropTypes.func.isRequired,
  date: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired
  // isChange: PropTypes.string.isRequired,
  // resource: PropTypes.array.isRequired
};

const mapStateFromProps = state => ({
  resource: getResource(state),
  isDay: getIsDay(state)
});


const mapDispatchFromProps = ({ changeCalendar, openWizard, closeWizard });


export default connect(mapStateFromProps, mapDispatchFromProps)(CalendarToolBar);


// {isAdd ? (
//   <Tooltip title="Записать">
//     <Fab
//       variant="extended"
//       color="secondary"
//       className={classes.button}
//       onClick={this.onClickWizard}
//     >
//       <AddIcon/>
//     </Fab>
//   </Tooltip>
// ) : null}
