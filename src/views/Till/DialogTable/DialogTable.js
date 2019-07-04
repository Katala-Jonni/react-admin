import React, { Component } from "react";
import PropTypes from "prop-types";

// material-ui components
import { withStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-react/views/extendedTablesStyle.jsx";
import ActonTill from "../ActonTill";

class OrderTable extends Component {

  getAmount = value => {
    let amount = 0;
    this.props[value].forEach((a) => amount += a.count);
    return amount;
  };

  isValidData = data => {
    if (!data || typeof data !== "object") return false;
    const keys = Object.keys(data);
    return !!keys.length;
  };

  handleClickAddInTill = data => {
    if (!this.isValidData(data)) return;
    return this.props.addInTill(data);
  };

  handleClickAddOutTill = data => {
    if (!this.isValidData(data)) return;
    this.setState({
      countCart: null
    });
    return this.props.addOutTill(data);
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
    const { classes, tableHead, col, isInTill, inTill, outTill, outTillCategory, inTillSum, outTillSum } = this.props;
    return (
      <div>
        {isInTill
          ? <GridContainer>
            <ItemGrid xs={12} container>
              <ActonTill
                handleClickAdd={this.handleClickAddInTill}
                options={outTillCategory}
              />
            </ItemGrid>
            {inTill.length
              ? <ItemGrid xs={12} item>
                <Table
                  striped
                  tableHead={tableHead}
                  tableData={[
                    ...this.getInTill(),
                    {
                      total: true,
                      colspan: col,
                      amount: `${inTillSum} ₽`
                      // amount: `${getAmount("inTill")} ₽`
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
              : null
            }
          </GridContainer>
          : null
        }
        {!isInTill
          ? <GridContainer>
            <ItemGrid xs={12} container>
              <ActonTill
                handleClickAdd={this.handleClickAddOutTill}
                options={outTillCategory}
                isOutTill
              />
            </ItemGrid>
            {outTill.length
              ? <ItemGrid xs={12} item>
                <Table
                  striped
                  tableHead={tableHead}
                  tableData={[
                    ...this.getOuTill(),
                    {
                      total: true,
                      colspan: col,
                      amount: `${outTillSum} ₽`
                      // amount: `${this.getAmount("outTill")} ₽`
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
              : null
            }
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
