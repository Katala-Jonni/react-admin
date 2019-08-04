import React, { Fragment, Component } from "react";
import propTypes from "prop-types";
import cx from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import CustomRadio from "components/Inputs/CustomRadioCheckBox";

import validationFormsStyle from "../../assets/jss/material-dashboard-react/views/validationFormsStyle";

class ValidationForms extends Component {
  render() {
    const {
      classes,
      label,
      id,
      input,
      type,
      placeholder,
      options,
      meta: { touched, error },
      ...rest
    } = this.props;
    return (
      <Fragment>
        <CustomInput
          input={input}
          type={type}
          id={id}
          labelText={label}
          placeholder={placeholder}
          success={!(error)}
          error={!!(touched && error)}
          formControlProps={{
            fullWidth: true
          }}
          {...rest}
        />
        {touched && error && <span className={cx(classes.labelErrorCustom)}>{error}</span>}
      </Fragment>

    );
  }
}

ValidationForms.propTypes = {
  input: propTypes.object.isRequired,
  id: propTypes.string,
  classes: propTypes.object,
  label: propTypes.string,
  placeholder: propTypes.string,
  type: propTypes.string,
  touched: propTypes.bool,
  error: propTypes.bool
};

export default withStyles(validationFormsStyle)(ValidationForms);
