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
  state = {};

  getTableData = () => {
    let { data } = this.props;
    // const adminInfo = {
    //   ["Администратор"]:
    //     [
    //       {
    //         totalCount: 1000,
    //         inMaster: 1000,
    //         outMaster: 0
    //       }
    //     ]
    // };
    // data = { ...data, ...adminInfo };

    const keys = Object.keys(data);
    if (keys) {
      return keys.map((name, idx) => {
        let totalCount = 0;
        let inMaster = 0;
        let outMaster = 0;
        data[name].forEach(item => {
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

  getRevenue = () => {
    let { data } = this.props;
    // const adminInfo = {
    //   ["Администратор"]:
    //     [
    //       {
    //         totalCount: 1000,
    //         inMaster: 1000,
    //         outMaster: 0
    //       }
    //     ]
    // };
    // data = { ...data, ...adminInfo };

    const keys = Object.keys(data);
    let infoDay = {
      revenue: 0,
      result: 0
    };
    if (keys) {
      keys.forEach((name) => {
        data[name].forEach(item => {
          infoDay.revenue += item.totalCount;
          infoDay.result += item.outMaster;
        });
      });
    }
    return infoDay;
  };

  render() {
    const { classes } = this.props;
    const infoDay = this.getRevenue();
    return (
      <GridContainer spacing={16}>
        <ItemGrid xs={12} item>
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
        <ItemGrid xs={12} sm={6} md={3} item>
          <StatsCard
            className={classes.indent}
            icon={ShoppingCart}
            iconColor="red"
            title="Выручка"
            description={infoDay.revenue}
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
            description={infoDay.result}
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
            description={0}
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
            description={0}
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
