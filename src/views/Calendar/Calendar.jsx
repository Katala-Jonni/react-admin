import React, { Component, Fragment, Children } from "react";
import PropTypes from "prop-types";
import BigCalendar from "react-big-calendar";
import moment from "moment/min/moment-with-locales";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import myEventsList from "../../modules/Calendar/events";
import totalResource from "../../modules/Calendar/totalResource";
import CalendarToolBar from "./CalendarToolBar";
import WizardView from "../../views/Forms/Wizard";
import SweetAlert from "react-bootstrap-sweetalert";

import "./Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import PersonAdd from "@material-ui/icons/PersonAdd";
import defaultResource from "../../modules/Calendar/defaultResource";

moment.locale("ru");

const localizer = BigCalendar.momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

const styleTooltip = theme => ({
  container: {
    display: "flex",
    justifyContent: "flex-start"
  },
  flexItem: {
    alignSelf: "center"
  },
  fab: {
    margin: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  rotate: {
    transform: "rotate(180deg)"
  },
  flexRight: {
    marginLeft: "auto",
    marginRight: "10px"
  }
});

// const ColoredDateCellWrapper = props => {
//   // console.log(props);
//   return React.cloneElement(Children.only(props.children), {
//     style: {
//       ...props.children.style,
//       backgroundColor: props.value < moment().toDate() ? "lightgray" : "lightblue"
//     }
//   });
// };
//
// const DayCalendarButton = props => {
//   // if (props.date < moment()) {
//   //   // return <Redirect to="/admin/calendar"/>
//   // }
//   console.log(props);
//   return (
//     <Fragment>
//       <div>
//         <Button variant="contained" className={props.classes.button}>
//           Сегодня
//         </Button>
//       </div>
//     </Fragment>
//   );
// };

// const CustomTooBar = props => {
//   const { classes } = props[0];
//   return (
//     <Fragment>
//       <Button variant="contained" className={classes.button}>
//         Link
//       </Button>
//       <Button variant="contained" className={classes.button}>
//         Link
//       </Button>
//     </Fragment>
//   );
// };
//
// CustomTooBar.propTypes = {
//   classes: PropTypes.object.isRequired
// };

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change: false,
      resize: false,
      view: "month",
      day: null,
      isDay: true,
      alert: null
    };

    this.moveEvent = this.moveEvent.bind(this);
    this.newEvent = this.newEvent.bind(this);
  }

  componentDidMount() {
    this.props.loadResource();
    // console.log(this.state, "props did mount");
  }

  titleAccessor = data => {
    console.log(data);
    return data.title;
  };
  tooltipAccessor = data => data.title;
  startAccessor = data => new Date();
  endAccessor = data => new Date();
  resourceAccessor = (data, ...args) => {
    console.log(data);
    return new Date();
  };

  getDifferenceTime = time => {
    // console.log(time);
    const a = moment(time);
    const b = moment();
    // console.log(a, b);
    if (a.diff(b) < 0) {
      return null;
    }
    return true;
  };

  moveEvent({ event, start, end, resourceId, isAllDay: droppedOnAllDaySlot }) {
    if (!this.getDifferenceTime(start)) return;

    // не передвигать
    const notMoveResource = defaultResource[0].resourceTitle.toLowerCase();
    const currentResource = event.resourceId.toLowerCase();
    const targetResource = resourceId.toLowerCase();
    if (targetResource === notMoveResource || currentResource === notMoveResource) {
      if (currentResource !== targetResource) return;
    }

    const { events, editEvents } = this.props;
    if (!this.state.resize) return;
    const idx = events.indexOf(event);
    let allDay = event.allDay;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }

    const updatedEvent = { ...event, start, end, allDay, resourceId };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    // запрос в базу и обовление базы
    editEvents(nextEvents);

    // this.setState({
    //   events: nextEvents
    // });

    // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
  }

  resizeEvent = ({ event, start, end }) => {
    if (!this.getDifferenceTime(start)) return;
    if (!this.state.resize) return; // КАСТОМНО СДЕЛАЛ
    const { events, editEvents } = this.props;
    // при резайзе времени меняем на текущее значение времени
    const nextEvents = events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    editEvents(nextEvents);

    // this.setState({
    //   events: nextEvents
    // });
  };

  addNewEventAlert(slotInfo) {
    this.setState({
      alert: (
        <SweetAlert
          // input
          showCancel
          style={{ display: "block", marginTop: "-700px" }}
          title="Input something"
          onConfirm={e => this.addNewEvent(e, slotInfo)}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
        >
          <WizardView/>
        </SweetAlert>
      )
    });
  }

  newEvent(event, ...args) {
    if (!this.getDifferenceTime(event.start)) return;
    if (event.action === "click" || event.action === "doubleClick") return; // КАСТОМНО СДЕЛАЛ
    if (event.slots.length && !event.bounds) return; // КАСТОМНО СДЕЛАЛ

    this.addNewEventAlert(event);

    let idList = this.props.events.map(a => a.id);
    console.log(event.resourceId);
    let newId = Math.max(...idList) + 1;
    let hour = {
      id: newId,
      title: "New Event",
      allDay: event.slots.length == 1,
      start: event.start,
      end: event.end,
      resourceId: event.resourceId
    };


    this.props.editEvents(this.props.events.concat([hour]));

    // this.setState({
    //   events: this.state.events.concat([hour])
    // });
  }

  resourceTitleAccessor = (data, ...args) => {
    // console.log(data);
    // console.log(args);
    return new Date();
  };

  onChangeState = () => this.setState({ isDay: false });

  onNavigate = (data, calendarInfo, actionInfo) => {
    const { selectDay, totalResource } = this.props;
    const { view, isDay } = this.state;

    if (view === "month" && !isDay) {
      this.setState({
        day: moment(data).format("DD.MM.YY"),
        isDay: true
      });
      // return selectDay({ resource: null });
      return selectDay({ resource: totalResource[moment(data).format("DD.MM.YY")], data });
    }

    // if(!this.state.day && this.state.view !== 'day'){
    //   return selectDay({ resource: null, data });
    // }
    // console.log(data, 'NAVIGATE');

    // console.log("Это день");
    // при выборе дня подгружаем всю информацию по дню,
    // всех мастеров, а также их записи
    selectDay({ resource: totalResource[moment(data).format("DD.MM.YY")], data });

    this.setState({
      day: moment(data).format("DD.MM.YY"),
      isDay: false
    });
  };

  onDrillDown = (data, ...args) => {
    console.log(data, "onDrillDown");
    console.log(args, "onDrillDown");
  };

  onRangeChange = (data, ...args) => {
    // возвращает диапазон дат календаря начало и конец
    console.log(data, "onRangeChange");
    console.log(args, "onRangeChange");
  };

  onSelectSlot = (data, ...args) => {
    console.log(data, "onSelectSlot");
    console.log(args, "onSelectSlot");
  };

  onSelectEvent = (data, ...args) => {
    const current = {
      id: 35,
      title: "Custom",
      start: new Date(2019, 3, 12, 14, 0, 0),
      end: new Date(2019, 3, 12, 15, 0, 0),
      resourceId: 2
    };
    // this.setState({
    //   events: [...this.state.events, current]
    // });
    console.log(data, "onSelectEvent");
    console.log(args, "onSelectEvent");
  };

  onDoubleClickEvent = (data, ...args) => {
    console.log(data, "onDoubleClickEvent");
    console.log(args, "onDoubleClickEvent");
    const res = window.prompt("Вы точно хотите удалить запись?");
    if (res) {
      this.setState({
        events: this.state.events.filter(item => item.id !== data.id)
      });
    }
  };

  onSelecting = (data, ...args) => {
    console.log(data, "onSelecting");
    console.log(args, "onSelecting");
  };

  selected = (data, ...args) => {
    console.log(data, "selected");
    console.log(args, "selected");
  };

  dayPropGetter = (data, ...args) => {
    const className = {
      backgroundColor: "red"
    };
    console.log(data, "dayPropGetter");
    console.log(args, "dayPropGetter");
    return className;
  };

  onView = data => {
    // перетаскивание записи, если мы находимся в выбранном дне

    if (data === "day") {
      return this.setState({ resize: true, view: "day" });
    }
    this.setState({ resize: false, view: "month" });
  };

  onDoubleClick = evt => {
    if (!this.getDifferenceTime(moment(this.state.day, "DD.MM.YY"))) return;
    const isTarget = evt.target.classList.contains("rbc-header");
    if (!isTarget) return;
    if (evt.target.textContent.trim().toLowerCase() === defaultResource[0].resourceTitle.toLowerCase()) return;
    const data = this.props.events.filter(item => moment(item.start).format("DD.MM.YY") === this.state.day);
    let elem = null;
    if (data) {
      elem = data.find(el => {
        // console.log(el.resourceId);
        return el.resourceId === evt.target.textContent;
      });
    }
    if (elem) return;
    const { deleteMasters } = this.props;
    deleteMasters({
      date: this.state.day,
      name: evt.target.textContent,
      resource: this.props.resource.filter(item => item.resourceTitle !== evt.target.textContent),
      resourceDay: { ...this.props.totalResource }
    });
  };

  onChangeResource = data => {
    // добавление мастера
    console.log(data);
    console.log(this.state.resource);
    this.setState({
      resource: [...this.state.resource, ...data]
      // change: true
    });
  };

  render() {
    const { classes, resource, events, totalResource, isWizardView } = this.props;
    const { change, day } = this.state;
    if (!totalResource) {
      return <h1>...Loading</h1>;
    }
    return (
      <Fragment>
        <div className="App" onDoubleClick={this.onDoubleClick}>
          {isWizardView
            ? <WizardView/>
            : <DragAndDropCalendar
              // resourceAccessor={this.resourceAccessor}
              selectable
              resizable={false}
              startAccessor="start"
              endAccessor="end"
              // resources={totalResource[day] || defaultResource}
              resources={resource}
              resourceIdAccessor="resourceId"
              resourceTitleAccessor="resourceTitle"
              onView={this.onView}
              views={["month", "day"]}
              step={7.5}
              localizer={localizer}
              events={events}
              style={{ height: "100vh" }}
              defaultDate={moment().toDate()}
              defaultView={BigCalendar.Views.MONTH}
              min={moment("10:00", "h:mma").toDate()}
              max={moment("20:00", "h:mma").toDate()}
              onEventDrop={this.moveEvent}
              onEventResize={this.resizeEvent}
              onSelectSlot={this.newEvent}
              onSelectEvent={this.onSelectEvent}
              onNavigate={this.onNavigate}
              onClick={this.onClick}
              onChangeState={this.onChangeState}
              components={{
                // you have to pass your custom wrapper here
                // so that it actually gets used
                // dayWrapper: withStyles(styleTooltip)(DayCalendarButton),
                // dateCellWrapper: ColoredDateCellWrapper,
                // day: {
                //   header:  withStyles(styleTooltip)(DayCalendarButton),
                //   event:  withStyles(styleTooltip)(DayCalendarButton)
                // },
                toolbar: withStyles(styleTooltip)(CalendarToolBar)
              }}

              // popupOffset={{x: 30, y: 20}}
              // popup
              // onDoubleClickEvent={this.onDoubleClickEvent}
              // onSelecting={this.onSelecting}
              // showMultiDayTimes
              // formats={formats} d
              // dayPropGetter={this.dayPropGetter}
              // titleAccessor={this.titleAccessor}
              // tooltipAccessor={this.tooltipAccessor}
              // startAccessor={this.startAccessor}
              // endAccessor={this.endAccessor}
              // resourceAccessor={this.resourceAccessor}
              // resourceTitleAccessor={this.resourceTitleAccessor}
              // selectable // выбор диапазаона времени без dnd
              // toolbar={false} // тулбар
              // getDrilldownView={(targetDate, currentViewName, configuredViewNames) => {
              //   if (currentViewName === "day" && configuredViewNames.includes("month")) {
              //     return "day";
              //   }
              //   return null;
              // }} // отклюяит переход по ссылке

              // views={{
              //   month: true,
              //   // week: false,
              //   day: true
              // }}
              // selected={{
              //   click: () => console.log('click')
              // }}
              // onRangeChange={this.onRangeChange}
              // onDrillDown={this.onDrillDown}
            />
          }
          {this.state.alert}
        </div>
      </Fragment>
    );
  }
}

Calendar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styleTooltip, { withTheme: true })(Calendar);
