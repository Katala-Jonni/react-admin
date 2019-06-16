import React from "react";
import PropTypes from "prop-types";
import GridContainer from "components/Grid/GridContainer.jsx";

class Till extends React.Component {
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
