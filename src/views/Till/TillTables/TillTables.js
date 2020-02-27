import React, { Component } from "react";
import PropTypes from "prop-types";

// material-ui components
import { withStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import OrderNumber from "../OrderNumber";

// material-ui icons

// core components
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";

import extendedTablesStyle from "assets/jss/material-dashboard-react/views/extendedTablesStyle.jsx";

import Paper from "@material-ui/core/Paper";
import OrderTable from "../OrderTable";

const infoPay = {
  ["cash"]: "Наличка",
  ["card"]: "Безнал",
  ["mixed"]: "Смешанная оплата",
  ["certificate"]: "Сертификатом"
};

const infoPayColor = {
  ["cash"]: "primary",
  ["card"]: "secondary",
  ["mixed"]: "default",
  ["certificate"]: "default"
};

class TillTable extends Component {
  state = {
    orderNumberView: false,
    orders: null,
    type: "",
    number: ""
  };

  handleClickOrderNumber = number => {
    const { totalOrders } = this.props;
    const { data, payment } = totalOrders[number - 1 || 0];
    this.setState({
      orderNumberView: true,
      orders: data,
      type: payment,
      number: number
    });
  };

  handleCloseViewNumber = () => {
    this.setState({
      orderNumberView: false
    });
  };

  getTableData = () => {
    const { data, classes } = this.props;
    const { orderNumberView } = this.state;
    if (data) {
      return data.map((item, idx) => {
        const { title, orderNumber, count, price, totalCount } = item;
        return [
          idx + 1,
          title,
          price,
          count,
          totalCount,
          <OrderNumber
            orderNumber={orderNumber}
            orderNumberView={orderNumberView}
            classes={classes}
            handleClickOrderNumber={this.handleClickOrderNumber}
          />
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

  render() {

    const { classes } = this.props;
    const { orderNumberView, orders, number, type } = this.state;
    const typePayment = infoPay[type.toLowerCase()];
    return (
      <GridContainer>
        <Dialog
          maxWidth={"md"}
          open={orderNumberView}
          onClose={this.handleCloseViewNumber}
          scroll="body"
        >
          <DialogTitle>
            <GridContainer justify={"space-between"}>
              <ItemGrid xs={3} item>
                Заказ #{number}
              </ItemGrid>
              <ItemGrid xs={3} item>
                <Chip
                  label={typePayment}
                  color={infoPayColor[type]}
                />
              </ItemGrid>
            </GridContainer>
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
