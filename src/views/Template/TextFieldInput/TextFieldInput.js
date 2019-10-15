import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";

// material-ui components
import ItemGrid from "components/Grid/GridItem.jsx";
import InputNumber from "components/Inputs/InputNumber";
import Button from "components/CustomButtons/Button.jsx";

class TextFieldInput extends Component {
  state = {
    value: null,
    disabled: false
  };

  handleChange = value => this.setState({ value });

  handleClickAddCount = () => {
    const { changeType, type, changeAddType, changeDisabled, addStopOption } = this.props;
    const { value, disabled } = this.state;
    if (disabled) return;
    changeType({ [type]: +value });
    changeAddType(true);
    this.setState({
      disabled: true,
      value: null
    });
    changeDisabled();
    addStopOption(type);
  };

  render() {
    const { name, label, addBtnText, balance } = this.props;
    const { value, disabled } = this.state;
    return (
      <ItemGrid xs={12} md={6} item container justify="space-around" spacing={16}>
        <ItemGrid xs={6} md={4} sm={3}>
          <Field
            autoFocus
            name={name}
            id={name}
            label={label}
            placeholder={label}
            value={value}
            component={InputNumber}
            onChange={this.handleChange}
            error={value > balance}
            errorMessage={`Остаток ${balance} ₽`}
            disabled={disabled}
          />
        </ItemGrid>
        {value && value <= balance
          ? <ItemGrid xs={6} md={4} sm={3}>
            <Button
              fullWidth
              size={"xs"}
              color={"success"}
              disabled={disabled}
              onClick={this.handleClickAddCount}
            >
              {addBtnText}
            </Button>
          </ItemGrid>
          : null
        }
      </ItemGrid>
    );
  }
}

TextFieldInput.defaultProps = {
  label: "Введите сумму",
  addBtnText: "Внести"
};

TextFieldInput.propTypes = {
  classes: PropTypes.object,
  type: PropTypes.string,
  label: PropTypes.string,
  addBtnText: PropTypes.string,
  name: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  changeAddType: PropTypes.func.isRequired,
  changeDisabled: PropTypes.func.isRequired,
  addStopOption: PropTypes.func.isRequired
};

export default TextFieldInput;
