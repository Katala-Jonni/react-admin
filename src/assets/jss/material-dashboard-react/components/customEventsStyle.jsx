import {
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor
} from "../../material-dashboard-react";


const customEventsStyle = theme => ({
  addButton: {
    backgroundColor: "#2196f3"
  },
  removeButton: {
    backgroundColor: "#ff3d00"
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
  }
});

export default customEventsStyle;
