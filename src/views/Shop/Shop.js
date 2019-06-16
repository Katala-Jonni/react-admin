import React from "react";
import PropTypes from "prop-types";
import GridContainer from "components/Grid/GridContainer.jsx";

class Shop extends React.Component {
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
  // classes: PropTypes.object.isRequired
};

export default Shop;
