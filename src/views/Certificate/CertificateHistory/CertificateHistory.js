import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "components/Table/Table.jsx";
import customEventsStyle from "assets/jss/material-dashboard-react/components/customEventsStyle";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

const moment = require("moment");

const ListMap = ({ items }) => {
  return (
    <List>
      {items.map((elem, key) => (
        <ListItem key={`${elem._id}`}>
          <ListItemText primary={`# ${key + 1}. ${elem.label}`}/>
        </ListItem>
      ))}
    </List>
  );
};

class CertificateHistory extends Component {
  state = {};

  getTableData = () => {
    const { data } = this.props;
    if (data && data.history) {
      return data.history.map((item, idx) => {
        const { date, out, place, list } = item;
        return [
          idx + 1,
          moment(date).format("LLLL"),
          list.length
            ? <ListMap items={list}/>
            : out,
          place
        ];
      });
    }
    return [];
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.rootTable}>
        <Table
          striped
          tableHead={[
            "#",
            "Дата",
            "Сумма/Услуга",
            "Место"
          ]}
          tableData={[
            ...this.getTableData()
          ]}
          customCellClasses={[
            classes.center,
            classes.center,
            classes.center,
            classes.center,
            classes.center
          ]}
          customClassesForCells={[0, 4, 5]}
          customHeadCellClasses={[
            classes.center,
            classes.center,
            classes.center,
            classes.center,
            classes.center
          ]}
          customHeadClassesForCells={[0, 4, 5]}
        />
      </Paper>
    );
  }
}

CertificateHistory.defaultProps = {};

CertificateHistory.propTypes = {
  classes: PropTypes.object
};

export default withStyles(customEventsStyle)(CertificateHistory);
