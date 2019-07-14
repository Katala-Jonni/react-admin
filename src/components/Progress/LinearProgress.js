import React from "react";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = ({
  root: {
    flexGrow: 1
  }
});

const LinearIndeterminate = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <LinearProgress/>
      <br/>
      <LinearProgress color="secondary"/>
    </div>
  );
};

export default withStyles(useStyles)(LinearIndeterminate);
