import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
//material-dashboard-pro-react/components/customInputStyle
import customInputStyle from "../../assets/jss/material-dashboard-react/components/customInputStyle";

class CustomInput extends Component {
  state = {};

  componentDidMount() {
    if (this.props.initialSelectValue) {
      this.props.input.onChange(this.props.initialSelectValue);
    }
  }

  render() {
    const {
      classes,
      formControlProps,
      labelText,
      id,
      labelProps,
      inputProps,
      error,
      success,
      helpText,
      rtlActive,
      input,
      viewIcon,
      notViewIcon,
      initialSelectValue,
      ...rest
    } = this.props;

    var labelClasses = cx({
      [" " + classes.labelRootError]: error,
      [" " + classes.labelRootSuccess]: success && !error
    });

    var formControlClasses = classes.formControl;
    if (formControlProps !== undefined) {
      formControlClasses += " " + formControlProps.className;
    }
    var underlineClasses = cx({
      [classes.underline]: true,
      [classes.underlineError]: error,
      [classes.underlineSuccess]: success && !error
    });
    if (inputProps !== undefined) {
      formControlClasses =
        formControlClasses +
        " " +
        cx({
          [classes.inputWithAdornment]:
          (inputProps.startAdornment !== undefined ||
            inputProps.endAdornment !== undefined) &&
          labelText === undefined
        });
    }
    if (inputProps !== undefined) {
      labelClasses =
        labelClasses +
        " " +
        cx({
          [classes.labelWithAdornment]: inputProps.endAdornment !== undefined
        });
    }
    const successClasses =
      classes.feedback +
      " " +
      classes.labelRootSuccess +
      " " +
      cx({
        [classes.feedbackNoLabel]: labelText === undefined,
        [classes.feedbackAdorment]:
        inputProps !== undefined && inputProps.endAdornment !== undefined
      });
    const errorClasses =
      classes.feedback +
      " " +
      classes.labelRootError +
      " " +
      cx({
        [classes.feedbackNoLabel]: labelText === undefined,
        [classes.feedbackAdorment]:
        inputProps !== undefined && inputProps.endAdornment !== undefined
      });
    const inputMain =
      classes.input +
      " " +
      cx({
        [classes.inputRTL]: rtlActive,
        [classes.inputNoLabel]: labelText === undefined
      });
    return (
      <FormControl
        {...formControlProps}
        className={formControlClasses}
        aria-describedby={id + "-text"}
      >
        {labelText !== undefined ? (
          <InputLabel
            className={classes.labelRoot + labelClasses}
            htmlFor={id}
            {...labelProps}
          >
            {labelText}
          </InputLabel>
        ) : null}
        <Input
          classes={{
            input: inputMain,
            disabled: classes.disabled,
            underline: underlineClasses
          }}
          id={id}
          {...input}
          {...inputProps}
          {...rest}
        />
        {viewIcon
          ? <Fragment>
            {error ? (
              <Clear className={errorClasses}/>
            ) : success ? (
              <Check className={successClasses}/>
            ) : null}
          </Fragment>
          : null
        }

        {helpText !== undefined ? (
          <FormHelperText style={{ color: "red" }} id={id + "-text"}>{helpText}</FormHelperText>
        ) : null}
      </FormControl>
    );
  }
}

CustomInput.propTypes = {
  classes: PropTypes.object.isRequired,
  input: PropTypes.object,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
  helpText: PropTypes.string,
  rtlActive: PropTypes.bool
};

export default withStyles(customInputStyle)(CustomInput);
