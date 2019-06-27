import React, { Component } from "react";
import PropTypes from "prop-types";
// material-ui components
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

// material-ui icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-react/views/extendedTablesStyle.jsx";

import Paper from "@material-ui/core/Paper";
import OrderTable from "../OrderTable";

class TillTable extends Component {
  state = {
    orderNumberView: false,
    orders: null
  };

  handleClickOrderNumber = evt => {
    const { totalOrders } = this.props;
    this.setState({
      orderNumberView: true,
      orders: totalOrders[evt.target.dataset.value],
      number: evt.target.dataset.value
    });
  };

  handleCloseViewNumber = () => {
    this.setState({
      orderNumberView: false
    });
  };

  getTableData = () => {
    const { data, classes } = this.props;
    if (data) {
      return data.map((item, idx) => {
        const { title, orderNumber, count, price, totalCount } = item;
        return [
          idx + 1,
          title,
          price,
          count,
          totalCount,
          <a className={classes.point} onClick={this.handleClickOrderNumber} data-value={orderNumber}>#{orderNumber}</a>
        ];
      });
    }
    return [];
  };

  getAmount = () => {
    const { head, totalDay } = this.props;
    let amount = 0;
    totalDay[head].forEach((a) => amount += a.totalCount);
    return amount;
  };

  getInMasterSum = () => {
    const { head, totalDay } = this.props;
    let amount = 0;
    totalDay[head].forEach((a) => amount += a.inMaster);
    return amount;
  };

  render() {
    const { classes, head, masters } = this.props;
    const { orderNumberView, orders, number } = this.state;
    const master = masters.find(a => a.value.toLowerCase() === head.toLowerCase());
    return (
      <GridContainer>
        <Dialog
          maxWidth={"md"}
          open={orderNumberView}
          onClose={this.handleCloseViewNumber}
          scroll="body"
        >
          <DialogTitle>
            Заказ #{number}
          </DialogTitle>
          <DialogContent>
            <OrderTable data={orders}/>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleCloseViewNumber}
              color={"primary"}
              variant="contained"
            >
              Закрыть
            </Button>
          </DialogActions>
        </Dialog>
        <ItemGrid xs={12}>
          <Paper>
            <Table
              striped
              tableHead={[
                "#",
                "Наименование",
                "Цена ₽",
                "Количество",
                "Стоимость ₽",
                "Номер заказа"
              ]}
              tableData={[
                ...this.getTableData(),
                {
                  total: true,
                  colspan: "4",
                  amount: `${this.getAmount()} ₽`
                }
              ]}
              customCellClasses={[
                classes.center,
                classes.center,
                classes.center,
                classes.center,
                classes.center,
                classes.center
              ]}
              customClassesForCells={[0, 5, 6]}
              customHeadCellClasses={[
                classes.center,
                classes.center,
                classes.center,
                classes.center,
                classes.center,
                classes.center
              ]}
              customHeadClassesForCells={[0, 5, 6]}
            />
            {
              master
                ? <p>Мастер Заработа: {this.getInMasterSum()} ₽</p>
                : null
            }

          </Paper>
        </ItemGrid>
      </GridContainer>
    );
  }
}

TillTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(extendedTablesStyle)(TillTable);
