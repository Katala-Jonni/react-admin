import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.jsx";

class Shop extends React.Component {
  state = {
    value: 0
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>Прайс</GridContainer>
      </div>
    );
  }
}

Shop.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Shop;
