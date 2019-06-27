import React, { Component } from "react";
import MaskedInput from "react-text-mask";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

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
    const { inputRef, onChange, ...other } = this.props;
    return (
      <NumberFormat
        getInputRef={inputRef}
        onChange={this.handleChange}
        allowNegative={false}
        {...other}
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
    const { classes, value, onChange, label, name, ...rest } = this.props;
    console.log(value);
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
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.number
};

export default withStyles(useStyles)(InputNumber);
