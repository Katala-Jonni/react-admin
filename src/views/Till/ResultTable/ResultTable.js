import React, { Component } from "react";
import PropTypes from "prop-types";

// material-ui components
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

// material-ui icons
import AccountBalanceWallet from "@material-ui/icons/AccountBalanceWallet";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import CreditCard from "@material-ui/icons/CreditCard";
import Money from "@material-ui/icons/Money";
import CardGiftcard from "@material-ui/icons/CardGiftcard";
import WbSunny from "@material-ui/icons/WbSunny";
import AttachMoney from "@material-ui/icons/AttachMoney";

// import Add from "@material-ui/icons/Add";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import StatsCard from "components/Cards/StatsCard.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-react/views/extendedTablesStyle.jsx";

class TillTable extends Component {

  componentDidMount() {
    const { loadInfoTill, totalDay, totalOrders } = this.props;
    loadInfoTill({ totalDay, certificateSum: this.getTotalSumCertificate(), totalOrders });
  }

  getTableData = () => {
    let { totalDay } = this.props;
    const keys = Object.keys(totalDay);
    if (keys) {
      return keys.map((name, idx) => {
        let totalCount = 0;
        let inMaster = 0;
        let outMaster = 0;
        totalDay[name].forEach(item => {
          totalCount += item.totalCount;
          inMaster += item.inMaster;
          outMaster += item.outMaster;
        });
        return [
          idx + 1,
          name,
          totalCount,
          inMaster,
          outMaster
        ];
      });
    }
    return [];
  };

  getTotalSumCertificate = () => {
    const { totalOrders } = this.props;
    let sum = 0;
    const keys = Object.keys(totalOrders);
    keys.forEach(item => {
      sum += +totalOrders[item].certificateSum;
    });
    return sum;
  };

  render() {
    const { classes, inTillSum, outTillSum, revenue, income, till, expense, payCategory: { cash, card, certificate } } = this.props;
    // const cash = revenue + inTillSum - (revenue - income) - outTillSum - paymentByCard;
    // console.log(this.props);
    console.log(revenue);
    console.log(inTillSum);
    console.log(expense);
    console.log(card);
    console.log(outTillSum);
    return (
      <GridContainer spacing={16}>
        {this.getTableData().length
          ? <ItemGrid xs={12} item>
            <Paper>
              <Table
                striped
                tableHead={[
                  "#",
                  "Наименование",
                  "Общая сумма",
                  "Мастеру",
                  "Салону"
                ]}
                tableData={[
                  ...this.getTableData()
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
          : null}
        <ItemGrid xs={12} sm={6} md={4} item>
          <StatsCard
            className={classes.indent}
            icon={ShoppingCart}
            iconColor="red"
            title="Выручка"
            description={revenue}
            small="₽"
            statIcon={ShoppingCart}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={6} md={4} item>
          <StatsCard
            className={classes.indent}
            icon={AccountBalanceWallet}
            iconColor="green"
            title="Остаток"
            description={income}
            small="₽"
            statIcon={AccountBalanceWallet}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={6} md={4} item>
          <StatsCard
            className={classes.indent}
            icon={AttachMoney}
            iconColor="blue"
            title="В кассе"
            description={revenue + inTillSum - expense - outTillSum - (card || 0)}
            small="₽"
            statIcon={AttachMoney}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={6} md={4} item>
          <StatsCard
            className={classes.indent}
            icon={CreditCard}
            iconColor="red"
            title="Картой"
            description={card || 0}
            small="₽"
            statIcon={CreditCard}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={6} md={4} item>
          <StatsCard
            className={classes.indent}
            icon={Money}
            iconColor="purple"
            title="Наличными"
            description={cash || 0}
            small="₽"
            statIcon={Money}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={6} md={4} item>
          <StatsCard
            className={classes.indent}
            icon={CardGiftcard}
            iconColor="orange"
            title="Сертификатом"
            description={certificate || 0}
            small="₽"
            statIcon={CardGiftcard}
          />
        </ItemGrid>
        {/*<ItemGrid xs={12} sm={6} md={4} item>*/}
        {/*<StatsCard*/}
        {/*className={classes.indent}*/}
        {/*icon={WbSunny}*/}
        {/*iconColor="red"*/}
        {/*title="Солярий"*/}
        {/*description={0}*/}
        {/*small="мин"*/}
        {/*statIcon={WbSunny}*/}
        {/*/>*/}
        {/*</ItemGrid>*/}
      </GridContainer>
    );
  }
}

TillTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(extendedTablesStyle)(TillTable);
