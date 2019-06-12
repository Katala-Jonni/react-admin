import React, { Component, Fragment, Children } from "react";
import PropTypes from "prop-types";
import BigCalendar from "react-big-calendar";
import moment from "moment/min/moment-with-locales";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import CalendarToolBar from "./CalendarToolBar";
import WizardView from "../../views/Forms/Wizard";
import SweetAlert from "react-bootstrap-sweetalert";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import defaultResource from "../../modules/Calendar/defaultResource";
import "./Calendar.css";
import SelectEvent from "./Events/Forms/SelectEvent/index";

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
  },
  bottom: {
    marginBottom: "200px"
  },
  mBottom: {
    marginBottom: "30px"
  }
});

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change: false,
      resize: false,
      view: "month",
      day: null,
      isDay: true,
      alert: null,
      selectEvent: false,
      selectEventValue: null,
      isNewEvent: false
    };

    this.moveEvent = this.moveEvent.bind(this);
    this.newEvent = this.newEvent.bind(this);
  }

  componentDidMount() {
    this.props.loadResource();
  }

  handleClickCloseSelectEvent = () => {
    this.setState({
      selectEvent: false,
      isNewEvent: false
    });
  };

  getDifferenceTime = time => {
    const a = moment(time);
    const b = moment();
    if (a.diff(b) < 0) {
      return null;
    }
    return true;
  };

  moveEvent = ({ event, start, end, resourceId, isAllDay: droppedOnAllDaySlot }) => {
    if (!this.getDifferenceTime(start) || this.state.view === "month") return;
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

  };

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

  newEvent = (event, ...args) => {
    if (!this.getDifferenceTime(event.start)) return;
    if (event.action === "click" || event.action === "doubleClick") return; // КАСТОМНО СДЕЛАЛ
    if (event.slots.length && !event.bounds) return; // КАСТОМНО СДЕЛАЛ

    let idList = this.props.events.map(a => a.id);
    let newId = Math.max(...idList) + 1;

    const data = {
      id: newId,
      date: event.start,
      start: event.start,
      end: event.end,
      resourceId: event.resourceId,
      lastName: "",
      surname: "",
      phoneNumber: "",
      title: "",
      titleEvent: ""
    };

    this.setState({
      selectEvent: true,
      selectEventValue: data,
      isNewEvent: true
    });

    // this.addNewEventAlert(event);

    // console.log(event);

    // let idList = this.props.events.map(a => a.id);
    // // console.log(event.resourceId);
    // let newId = Math.max(...idList) + 1;
    // let hour = {
    //   id: newId,
    //   title: "New Event",
    //   allDay: event.slots.length == 1,
    //   start: event.start,
    //   end: event.end,
    //   resourceId: event.resourceId
    // };
    //
    //
    // this.props.editEvents(this.props.events.concat([hour]));

    // this.setState({
    //   events: this.state.events.concat([hour])
    // });
  };

  onChangeState = () => this.setState({ isDay: false });

  onNavigate = data => {
    const { selectDay, totalResource } = this.props;
    const { view, isDay } = this.state;

    if (view === "month" && !isDay) {
      this.setState({
        day: moment(data).format("DD.MM.YY"),
        isDay: true
      });
      return selectDay({ resource: totalResource[moment(data).format("DD.MM.YY")], data });
    }
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

  onSelectEvent = data => {
    if (!this.getDifferenceTime(data.date)) return;
    this.setState({
      selectEvent: true,
      selectEventValue: data
    });
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
    });
  };

  render() {
    const { classes, resource, events, totalResource } = this.props;
    const { change, day, selectEvent, selectEventValue, isNewEvent } = this.state;
    if (!totalResource) {
      return <h1>...Loading</h1>;
    }
    return (
      <Fragment>
        {this.state.selectEvent
          ? <SelectEvent
            open={selectEvent}
            handleClickCloseSelectEvent={this.handleClickCloseSelectEvent}
            selectEventValue={selectEventValue}
            isNewEvent={isNewEvent}
          />
          : null
        }
        <div className="App" onDoubleClick={this.onDoubleClick}>
          <DragAndDropCalendar
            popup
            selectable
            resizable={false}
            startAccessor="start"
            endAccessor="end"
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
              toolbar: withStyles(styleTooltip)(CalendarToolBar)
            }}
          />
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
