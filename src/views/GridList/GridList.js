import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// core components
import ItemGrid from "components/Grid/GridItem.jsx";
import Typography from "@material-ui/core/Typography";

// material-ui components
import Chip from "@material-ui/core/Chip";
// @material-ui/icons
// style

class GridList extends Component {
  state = {};

  getOptions = () => {
    const { classes: { addCardForm, topBottom, leftMargin }, loader, options } = this.props;
    return options.map(item => {
      const { label, value, isChip, component: Component, chip, componentProps, separator } = item;
      return (
        <Typography
          variant="body1"
          component="div"
          className={isChip ? cx(addCardForm, topBottom) : addCardForm}
          color="textSecondary"
          key={label}
        >
          {label}{separator} {!isChip ? <span style={{ color: "black", fontSize: 18 }}>{value}</span> : null}
          {isChip
            ? <Chip
              {...chip}
              label={value}
            />
            : null
          }
          {Component && loader ?
            <Component
              {...componentProps}
              className={leftMargin}
            />
            : null
          }
        </Typography>
      );
    });
  };

  getViews = () => {
    if (!this.getOptions().length) return null;
    const step = this.props.step;
    const countGrid = this.getOptions().length / step;
    let count = 1;
    let start = 0;
    const views = [];
    while (count <= Math.ceil(countGrid)) {
      views.push([
        <ItemGrid xs={12} sm={6} item key={count}>
          {
            this.getOptions().slice(start, count * step)
          }
        </ItemGrid>

      ]);
      start = count * step;
      count++;
    }
    return views;
  };

  render() {
    return (
      <Fragment>
        {this.getViews()}
        {this.props.children}
      </Fragment>
    );
  }
}

GridList.defaultProps = {
  step: 5
};

GridList.propTypes = {
  classes: PropTypes.object,
  options: PropTypes.array.isRequired,
  loader: PropTypes.bool,
  step: PropTypes.number
};

export default GridList;
