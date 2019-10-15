import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import FormHelperText from "@material-ui/core/FormHelperText";

class CustomSelectView extends Component {
  state = {};

  componentDidMount() {
    const { selectEvent, defaultValue, input: { onChange } } = this.props;
    selectEvent ? onChange(defaultValue) : onChange("");
  }

  handleChange = data => {
    if (this.props.isMulti) {
      return this.props.input.onChange(data);
    }
    return this.props.input.onChange(data.value);
  };

  handleFocus = () => {
    this.props.handleFocus && this.props.handleFocus();
  };

  onInputChange = () => {
    this.props.onInputChange && this.props.onInputChange();
  };

  onMenuClose = () => {
    this.props.onMenuClose && this.props.onMenuClose();
  };

  onMenuOpen = () => {
    this.props.onMenuOpen && this.props.onMenuOpen();
  };

  render() {
    const {
      input,
      label,
      id,
      meta: { error },
      options,
      disabled,
      classes,
      defaultValue,
      menuIsOpen,
      height,
      isMulti,
      selectValues
    } = this.props;
    return (
      <Fragment>
        <Select
          name={input.name}
          id={id}
          options={options}
          placeholder={label}
          label={label}
          defaultValue={defaultValue}
          // тут менял selectValues
          value={selectValues}
          isDisabled={disabled}
          maxMenuHeight={height}
          isMulti={isMulti}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onInputChange={this.onInputChange}
          onMenuClose={this.onMenuClose}
          onMenuOpen={this.onMenuOpen}
          menuIsOpen={menuIsOpen}
          theme={theme => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: error ? "red" : "#3f51b5"
            }
          })}
        />
        {error ? (
          <FormHelperText className={classes.errorColor} id={id + "-text"}>{error}</FormHelperText>
        ) : null}
      </Fragment>
    );
  }
}

CustomSelectView.defaultProps = {
  height: 150,
  label: "Выберите имя мастера/Солярий"
};

CustomSelectView.propTypes = {
  classes: PropTypes.object,
  options: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  input: PropTypes.object.isRequired,
  defaultValue: PropTypes.object,
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool
};

export default CustomSelectView;
