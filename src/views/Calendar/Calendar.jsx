import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import BigCalendar from "react-big-calendar";
import moment from "moment/min/moment-with-locales";
import { withStyles } from "@material-ui/core/styles";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import CalendarToolBar from "./CalendarToolBar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./Calendar.css";
import SelectEvent from "./Events/Forms/SelectEvent/index";
import defaultResource from "../../modules/Calendar/defaultResource";
import Progress from "../../components/Progress/Progress";
import Popup from "./Popup";
import { startApp } from "../../modules/Admin/actions";
import { loadResource } from "../../modules/Calendar";

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
      resize: false,
      view: "month",
      isDay: true,
      selectEvent: false,
      selectEventValue: null,
      isNewEvent: false,
      eve: [],
      showModal: false,
      events: null,
      popupDate: moment()
    };
  }

  componentDidMount() {
    this.props.startApp();
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

  moveEvent = ({ event, start, end, resourceId }) => {
    if (!this.getDifferenceTime(start) || this.state.view === "month") return;
    // не передвигать
    const notMoveResource = defaultResource[0].resourceTitle.toLowerCase();
    const currentResource = event.resourceId.toLowerCase();
    const targetResource = resourceId.toLowerCase();
    if (targetResource === notMoveResource || currentResource === notMoveResource) {
      if (currentResource !== targetResource) return;
    }
    if (!this.state.resize) return;

    this.props.updateEvents({ ...event, start, end, resourceId, date: start });
  };

  resizeEvent = ({ event, start, end }) => {
    console.log("test");
    if (!this.getDifferenceTime(start)) return;
    if (!this.state.resize) return; // КАСТОМНО СДЕЛАЛ
    // запрос в базу и обовление базы
    this.props.updateEvents({ ...event, start, end, date: start });
  };

  newEvent = event => {
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
  };

  onChangeState = () => this.setState({ isDay: false });

  onNavigate = date => {
    const { selectViewEvents } = this.props;
    const { view, isDay } = this.state;
    selectViewEvents(date);
    const checkNavigate = view === "month" && !isDay;

    return this.setState({
      day: moment(date).format("DD.MM.YY"),
      isDay: checkNavigate
    });
  };

  onSelectEvent = data => {
    const { endTimeTimeHour, endTimeTimeMinute } = this.props;
    const date = moment(data.date).set({ "hour": endTimeTimeHour, "minute": endTimeTimeMinute });
    if (!this.getDifferenceTime(date)) return;
    this.setState({
      selectEvent: true,
      selectEventValue: data
    });
  };

  onView = (data) => {
    // перетаскивание записи, если мы находимся в выбранном дне
    if (data === "day") {
      return this.setState({ resize: true, view: "day" });
    }
    this.setState({ resize: false, view: "month" });
  };

  onDoubleClick = evt => {
    // console.log(moment(this.state.day, "DD.MM.YY"), 'onDoubleClick');
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
    const { deleteMasters, resource, totalResource } = this.props;
    deleteMasters({
      date: this.state.day,
      name: evt.target.textContent,
      resource: resource.filter(item => item.resourceTitle !== evt.target.textContent),
      resourceDay: { ...totalResource }
    });
  };

  render() {
    const {
      resource,
      events,
      totalResource,
      startTimeHour,
      startTimeMinute,
      endTimeTimeHour,
      endTimeTimeMinute,
      step
    } = this.props;
    const { selectEvent, selectEventValue, isNewEvent } = this.state;

    if (!totalResource) {
      return <h1>...Loading</h1>;
    }

    if (!events && !events.length) {
      return (
        <Progress/>
      );
    }

    // console.log(moment().isSameOrAfter("2020-01-01"));
    // console.log(this.state.popupDate);
    // console.log(this.state.popupDate);
    // console.log(moment().format());
    // console.log(moment().isSameOrAfter(this.state.popupDate));
    // console.log(this.state.popupDate);
    // console.log(moment());

    // console.log(moment() >= this.state.popupDate);

    // console.log(moment(this.state.popupDate).isAfter(moment()));
    // console.log("---------");
    //
    // console.log(moment().toDate());
    // console.log(moment());

    return (
      <Fragment>
        {selectEvent
          ? <SelectEvent
            open={selectEvent}
            selectEventValue={selectEventValue}
            isNewEvent={isNewEvent}
            handleClickCloseSelectEvent={this.handleClickCloseSelectEvent}
          />
          : null
        }
        <div className="App" onDoubleClick={this.onDoubleClick}>
          <DragAndDropCalendar
            popup
            selectable
            startAccessor="start"
            endAccessor="end"
            resourceIdAccessor="resourceId"
            resourceTitleAccessor="resourceTitle"
            views={["month", "day"]}
            step={step}
            resizable={false}
            resources={resource}
            events={events}
            localizer={localizer}
            style={{ height: "85vh" }}
            defaultDate={moment().toDate()}
            defaultView={BigCalendar.Views.MONTH}
            min={moment(`${startTimeHour}:${startTimeMinute}`, "h:mma").toDate()}
            max={moment(`${endTimeTimeHour}:${endTimeTimeMinute}`, "h:mma").toDate()}
            onView={this.onView}
            onEventDrop={this.moveEvent}
            onEventResize={this.resizeEvent}
            onSelectSlot={this.newEvent}
            onSelectEvent={this.onSelectEvent}
            onNavigate={this.onNavigate}
            onChangeState={this.onChangeState}
            onShowMore={(events, date) => this.setState({ events, popupDate: moment(date) })}
            messages={{
              showMore: (target) => <span style={{ cursor: "pointer", color: "red" }} role="presentation"
                                          onClick={() => this.setState({
                                            calendarOverlay: true,
                                            currentTitleData: {}
                                          })}> +{target} еще</span>
            }}
            components={{
              toolbar: withStyles(styleTooltip)(CalendarToolBar)
            }}
          />
          {this.state.showModal && <Popup events={this.state.events}/>}
        </div>
      </Fragment>
    );
  }
}

Calendar.defaultProps = {
  startTimeHour: 10,
  startTimeMinute: 0,
  endTimeTimeHour: 20,
  endTimeTimeMinute: 0,
  step: 7.5
};

Calendar.propTypes = {
  resource: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  totalResource: PropTypes.object.isRequired,
  startTimeHour: PropTypes.number,
  startTimeMinute: PropTypes.number,
  endTimeTimeHour: PropTypes.number,
  endTimeTimeMinute: PropTypes.number,
  deleteMasters: PropTypes.func.isRequired,
  loadResource: PropTypes.func.isRequired,
  selectDay: PropTypes.func.isRequired,
  step: PropTypes.number
};

export default Calendar;
