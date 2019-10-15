import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { FieldArray, reduxForm } from "redux-form";

// core components
import { withStyles } from "@material-ui/core/styles/index";

// material-ui components
import RenderMembersType from "./RenderMembers";
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";

// @material-ui/icons

// style
import customEventsStyle from "assets/jss/material-dashboard-react/components/customEventsStyle";

class Template extends Component {
  state = {};

  render() {
    const { classes, handleSubmit, totalPrice } = this.props;
    return (
      <Fragment>
        <GridContainer
          spacing={8}
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <ItemGrid xs={12}>
            <form onSubmit={this.props.handleSubmit}>
              <FieldArray
                name="members"
                classes={classes}
                component={RenderMembersType}
                reset={this.props.reset}
                totalSum={totalPrice}
              />
            </form>
          </ItemGrid>
        </GridContainer>
      </Fragment>
    );
  }
}

Template.defaultProps = {};

Template.propTypes = {
  classes: PropTypes.object
};
export default reduxForm({
  form: "templateInfo"
})(withStyles(customEventsStyle)(Template));
