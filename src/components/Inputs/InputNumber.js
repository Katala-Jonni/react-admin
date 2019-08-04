import React, { Component } from "react";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    // margin: theme.spacing.unit * 1,
    minWidth: 35
  }
});

class NumberFormatCustom extends Component {

  handleChange = event => {
    this.props.onChange(parseFloat(event.target.value));
  };

  render() {
    const { inputRef, onChange, ...rest } = this.props;
    return (
      <NumberFormat
        getInputRef={inputRef}
        onChange={this.handleChange}
        allowNegative={false}
        {...rest}
      />
    );
  }
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

class InputNumber extends Component {
  render() {
    const { classes, value, onChange, label, name,fullWidth, ...rest } = this.props;
    console.log(rest);
    return (
      <div className={classes.container}>
        <TextField
          className={classes.formControl}
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          InputProps={{
            inputComponent: NumberFormatCustom
          }}
          {...rest}
        />
      </div>
    );
  }
}

InputNumber.defaultValue = {
  label: "Введите число",
  name: `${Math.random()}numberCount${Math.random()}`
};

InputNumber.propTypes = {
  classes: PropTypes.object.isRequired,
  // onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.number
};

export default withStyles(useStyles)(InputNumber);
