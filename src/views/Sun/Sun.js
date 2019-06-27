import React, { Component } from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.jsx";

class Sun extends Component {
  state = {
    value: 0
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>Солярий</GridContainer>
      </div>
    );
  }
}

Sun.propTypes = {
  // classes: PropTypes.object.isRequired
};

export default Sun;
