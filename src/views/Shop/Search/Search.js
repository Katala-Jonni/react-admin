import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";

const useStyles = () => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center"
  },
  input: {
    marginLeft: 8,
    flex: 1,
    padding: 10
  }
});

class Search extends Component {
  state = {};

  render() {
    const { classes, handleChange, placeholder } = this.props;
    return (
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder={placeholder}
          inputProps={{ "aria-label": { placeholder } }}
          onChange={handleChange}
        />
      </Paper>
    );
  }
}

Search.defaultProps = {
  placeholder: "Введите название услуги/товара"
};

Search.propTypes = {
  classes: PropTypes.object,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired
};

export default withStyles(useStyles)(Search);
