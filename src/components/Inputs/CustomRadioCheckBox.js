import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

import regularFormsStyle from "../../assets/jss/material-dashboard-react/views/regularFormsStyle.jsx";

class CustomRadioCheckBox extends Component {
  state = {
    selectedValue: null
  };

  handleChange = (evt) => {
    const { value } = evt.target;
    this.setState({ selectedValue: value });
    this.props.input.onChange(value);
  };

  static getDerivedStateFromProps(nextProps) {
    const { isSubmit } = nextProps;
    if (isSubmit) {
      return {
        selectedValue: null
      };
    }
    return null;
  }

  render() {
    const { classes, id, name, options, label, isVerifyCard, meta: { error }, disabled } = this.props;
    return (
      <GridContainer
        spacing={0}
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <ItemGrid xs={12}>
          <FormLabel className={error ? classes.labelErrorCustom : null}>
            {label}
            {/*{error ? (*/}
            {/*<FormHelperText className={classes.labelErrorCustom} id={id + "-text"}>{error}</FormHelperText>*/}
            {/*) : null}*/}
          </FormLabel>
        </ItemGrid>
        {options.map((item, idx) => {
          return (
            <ItemGrid xs={12} sm={isVerifyCard ? 4 : 2} key={idx}>
              <FormControlLabel
                control={
                  <Radio
                    checked={disabled ? false : this.state.selectedValue === item.value}
                    onChange={this.handleChange}
                    value={item.value}
                    name={name}
                    disabled={disabled}
                    aria-label={item.value}
                  />
                }
                label={item.label}
              />
            </ItemGrid>
          );
        })
        }
      </GridContainer>
    );
  }
}

CustomRadioCheckBox.defaultProps = {};

CustomRadioCheckBox.propTypes = {
  classes: PropTypes.object
};

export default withStyles(regularFormsStyle)(CustomRadioCheckBox);
