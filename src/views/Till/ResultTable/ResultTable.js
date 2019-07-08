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

// import Add from "@material-ui/icons/Add";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import StatsCard from "components/Cards/StatsCard.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-react/views/extendedTablesStyle.jsx";

class TillTable extends Component {

  componentDidMount() {
    const { loadInfoTill, totalDay } = this.props;
    loadInfoTill({ totalDay });
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

  render() {
    const { classes, inTillSum, outTillSum, paymentByCard, revenue, income } = this.props;
    const cash = revenue + inTillSum - (revenue - income) - outTillSum - paymentByCard;
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
        <ItemGrid xs={12} sm={6} md={3} item>
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
        <ItemGrid xs={12} sm={6} md={3} item>
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
        <ItemGrid xs={12} sm={6} md={3} item>
          <StatsCard
            className={classes.indent}
            icon={CreditCard}
            iconColor="purple"
            title="Безнал"
            description={paymentByCard}
            small="₽"
            statIcon={CreditCard}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={6} md={3} item>
          <StatsCard
            className={classes.indent}
            icon={Money}
            iconColor="blue"
            title="Наличка"
            description={cash}
            small="₽"
            statIcon={Money}
          />
        </ItemGrid>
      </GridContainer>
    );
  }
}

TillTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(extendedTablesStyle)(TillTable);
