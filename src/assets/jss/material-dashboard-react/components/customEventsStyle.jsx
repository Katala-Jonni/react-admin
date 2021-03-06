import {
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor
} from "../../material-dashboard-react";

import buttonStyle from "./buttonStyle.jsx";

const customEventsStyle = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  rootTable: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%"
  },
  topMargin: {
    marginTop: theme.spacing.unit * 1
  },
  topMargin2: {
    marginTop: theme.spacing.unit * 2
  },
  rightMargin: {
    marginRight: theme.spacing.unit * 2
  },
  leftMargin: {
    marginLeft: theme.spacing.unit * 2
  },
  addCardForm: {
    padding: theme.spacing.unit * 2
  },
  topBottom: {
    paddingTop: theme.spacing.unit * 1.2,
    paddingBottom: theme.spacing.unit * 1.2
  },
  chip: {
    margin: theme.spacing.unit * 1
  },
  bottomMargin: {
    marginBottom: theme.spacing.unit * 1
  },
  addButton: {
    backgroundColor: "#2196f3"
  },
  removeButton: {
    backgroundColor: "#ff3d00"
  },
  errorColor: {
    color: "#ff3d00",
    fontWeight: "400",
    fontSize: "12px",
    lineHeight: "1.42857",
    fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif"
  },
  borderColor: {
    border: "1px solid #ff3d00"
  },
  list: {
    listStyle: "none",
    paddingLeft: 0
  },
  itemHeader: {
    margin: 0,
    marginTop: 10
  },
  indent: {
    marginRight: 10
  },
  flex: {
    display: "flex",
    justifyContent: "space-between"
  },
  flexItem: {
    alignSelf: "center"
  },
  grid: {
    width: "100%"
  },
  cardTitle: {
    marginTop: "0",
    marginBottom: "3px",
    color: "#3C4858",
    fontSize: "18px"
  },
  center: {
    textAlign: "center"
  },
  right: {
    textAlign: "right"
  },
  left: {
    textAlign: "left"
  },
  textField: {
    marginLeft: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 1
  },
  ...buttonStyle
});

export default customEventsStyle;
