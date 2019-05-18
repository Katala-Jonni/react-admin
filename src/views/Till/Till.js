import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.jsx";

class Till extends React.Component {
  state = {
    value: 0
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>Касса</GridContainer>
      </div>
    );
  }
}

Till.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Till;