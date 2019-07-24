import React, { Component } from "react";
import PropTypes from "prop-types";

// material-ui components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import CustomButton from "components/CustomButtons/Button.jsx";

// material-ui icons
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";

class OrderNumber extends Component {
  state = {
    up: false
  };

  static getDerivedStateFromProps(nextProps) {
    const { orderNumberView } = nextProps;
    if (!orderNumberView) {
      return {
        up: false
      };
    }
    return null;
  }

  handleClick = evt => {
    this.setState({
      up: true
    });
    const number = evt.currentTarget.dataset.value;
    this.props.handleClickOrderNumber(number);
  };

  render() {
    const { classes, orderNumber, orderNumberView } = this.props;
    const { up } = this.state;
    return (
      <CustomButton
        color={up && orderNumberView ? "info" : "success"}
        data-value={orderNumber}
        className={classes.point}
        onClick={this.handleClick}
      >
        <GridContainer justify={"space-between"}>
          <ItemGrid xs={2} item>
            <span> #{orderNumber}</span>
          </ItemGrid>
          <ItemGrid xs={2} item>
            {up && orderNumberView
              ? <KeyboardArrowUp className={classes.icon}/>
              : <KeyboardArrowDown className={classes.icon}/>
            }
          </ItemGrid>
        </GridContainer>
      </CustomButton>
    );
  }
}

OrderNumber.defaultProps = {};

OrderNumber.propTypes = {
  classes: PropTypes.object.isRequired,
  orderNumber: PropTypes.number.isRequired,
  orderNumberView: PropTypes.bool,
  handleClickOrderNumber: PropTypes.func.isRequired
};

export default OrderNumber;
