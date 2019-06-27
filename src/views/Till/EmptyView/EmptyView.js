import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const useStyles = theme => ({
  root: {
    padding: theme.spacing.unit * 2
  }
});

class EmptyView extends Component {
  state = {};

  render() {
    const { classes, title } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Typography variant="h5" component="h3">
            {title}
          </Typography>
        </Paper>
      </div>
    );
  }
}

EmptyView.defaultProps = {
  title: "Кассовых операций сегодня еще не было :("
};

EmptyView.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string
};

export default withStyles(useStyles)(EmptyView);
