import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import FormHelperText from "@material-ui/core/FormHelperText";

class CustomSelectView extends Component {
  componentDidMount() {
    const { selectEvent, defaultValue, input: { onChange } } = this.props;
    selectEvent ? onChange(defaultValue) : onChange("");
  }

  handleChange = data => {
    this.props.input.onChange(data.value);
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
      height
    } = this.props;
    return (
      <Fragment>
        <Select
          name={input.name}
          id={id}
          options={options}
          placeholder={label}
          defaultValue={defaultValue}
          isDisabled={disabled}
          maxMenuHeight={height}
          onChange={this.handleChange}
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
  classes: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  input: PropTypes.object.isRequired,
  defaultValue: PropTypes.object,
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool
};

export default CustomSelectView;
