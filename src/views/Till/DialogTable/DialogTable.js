import React, { Component } from "react";
import PropTypes from "prop-types";

// material-ui components
import { withStyles } from "@material-ui/core/styles";
import Button from "../../../components/CustomButtons/Button";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-react/views/extendedTablesStyle.jsx";

class OrderTable extends Component {
  state = {};

  getTableData = () => {
    const { data } = this.props;
    if (data) {
      return data.map((item, idx) => {
        const { title, count, price, totalCount } = item;
        return [
          idx + 1,
          title,
          price,
          count,
          totalCount
        ];
      });
    }
    return [];
  };

  getAmount = () => {
    const { data } = this.props;
    let amount = 0;
    data.forEach((a) => amount += a.totalCount);
    return amount;
  };

  render() {
    const { classes, isInTill, tableHead, col } = this.props;
    return (
      <div>
        <GridContainer justify="center">
          <ItemGrid xs={12} container>
            <ItemGrid xs={2} item>
              Форма
            </ItemGrid>
            <ItemGrid xs={2} item>
              <Button variant="contained" color="success">Внести</Button>
            </ItemGrid>
          </ItemGrid>
          <ItemGrid xs={12} item>
            <Table
              striped
              tableHead={tableHead}
              tableData={[
                // ...this.getTableData(),
                {
                  total: true,
                  colspan: col
                  // amount: `${this.getAmount()} ₽`
                }
              ]}
              customCellClasses={[
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
                classes.center
              ]}
              customHeadClassesForCells={[0, 5, 6]}
            />
          </ItemGrid>
        </GridContainer>

      </div>
    );
  }
}

OrderTable.defaultProps = {};

OrderTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(extendedTablesStyle)(OrderTable);
