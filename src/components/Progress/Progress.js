import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";

const useStyles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class Progress extends Component {
  state = {};

  render() {
    const { classes } = this.props;
    return (
      <GridContainer
        direction={"row"}
        justify={"center"}
        alignItems={"center"}
        style={{ height: "100vh" }}
      >
        <ItemGrid xs={2} item>
          <CircularProgress className={classes.progress} size={67}/>
        </ItemGrid>
      </GridContainer>
    );
  }
}

Progress.defaultProps = {};

Progress.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(Progress);
