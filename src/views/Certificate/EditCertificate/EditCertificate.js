import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// core components
import Paper from "@material-ui/core/Paper";
// material-ui components
import CustomSelectView from "../../../components/Inputs/CustomSelectView";

// @material-ui/icons

class EditCertificate extends Component {
  state = {};

  render() {
    const { certificate } = this.props;
    return (
      <Fragment>
        <Paper>
        </Paper>
      </Fragment>
    );
  }
}

EditCertificate.defaultProps = {};

EditCertificate.propTypes = {
  classes: PropTypes.object
};

export default EditCertificate;
