import React, { Component } from "react";
import PropTypes from "prop-types";

// material-ui components
import { withStyles } from "@material-ui/core/styles";
import Button from "../../../components/CustomButtons/Button";
import InputNumber from "../../../components/InputNumber/InputNumber";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-react/views/extendedTablesStyle.jsx";
import { addInTill, loadTill } from "../../../modules/Till";

class OrderTable extends Component {
  state = {
    countCart: null
  };

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

  getAmount = value => {
    let amount = 0;
    this.props[value].forEach((a) => amount += a.count);
    return amount;
  };

  handleChangeCountCart = value => {
    this.setState({
      countCart: !value ? null : value
    });
  };

  handleClickAddInTill = () => {
    const { addInTill } = this.props;
    const { countCart } = this.state;
    if (!countCart) return;
    this.setState({
      countCart: null
    });
    return addInTill(countCart);
  };

  handleClickAddOutTill = () => {
    const { addOutTill } = this.props;
    const { countCart } = this.state;
    if (!countCart) return;
    this.setState({
      countCart: null
    });
    return addOutTill(countCart);
  };

  getInTill = () => {
    const { inTill } = this.props;
    return inTill.map((item, idx) => {
      return [
        idx + 1,
        item.count,
        item.time
      ];
    });
  };

  getOuTill = () => {
    const { outTill } = this.props;
    return outTill.map((item, idx) => {
      return [
        idx + 1,
        item.title,
        item.count,
        item.time
      ];
    });
  };

  render() {
    const { classes, tableHead, col, isInTill, inTill, outTill, getAmount } = this.props;
    const { countCart } = this.state;
    return (
      <div>
        {isInTill && inTill.length
          ? <GridContainer>
            <ItemGrid xs={12} container>
              <ItemGrid xs={2} item>
                <InputNumber
                  value={countCart}
                  onChange={this.handleChangeCountCart}
                  autoFocus
                />
              </ItemGrid>
              <ItemGrid xs={2} item>
                <Button
                  variant="contained"
                  color={!countCart && countCart < 1 ? "danger" : "success"}
                  disabled={!countCart && countCart < 1}
                  onClick={this.handleClickAddInTill}
                >
                  Внести
                </Button>
              </ItemGrid>
            </ItemGrid>
            <ItemGrid xs={12} item>
              <Table
                striped
                tableHead={tableHead}
                tableData={[
                  ...this.getInTill(),
                  {
                    total: true,
                    colspan: col,
                    amount: `${getAmount("inTill")} ₽`
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
          : null
        }
        {!isInTill && outTill.length
          ? <GridContainer>
            <ItemGrid xs={12} container>
              <ItemGrid xs={2} item>
                <InputNumber
                  value={countCart}
                  onChange={this.handleChangeCountCart}
                  label={"Введите число"}
                  autoFocus
                />
              </ItemGrid>
              {countCart && countCart >= 1
                ? <ItemGrid xs={2} item>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={this.handleClickAddOutTill}
                  >
                    Внести
                  </Button>
                </ItemGrid>
                : null
              }
            </ItemGrid>
            <ItemGrid xs={12} item>
              <Table
                striped
                tableHead={tableHead}
                tableData={[
                  ...this.getOuTill(),
                  {
                    total: true,
                    colspan: col,
                    amount: `${this.getAmount("outTill")} ₽`
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
          : null
        }

      </div>
    );
  }
}

OrderTable.defaultProps = {};

OrderTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(extendedTablesStyle)(OrderTable);
