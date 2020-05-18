import React, { Component } from "react";
import PropTypes from "prop-types";

class CustomCheckbox extends Component {

  componentDidMount() {
    this.props.input.onChange(this.props.initialSelectValue);
  }

  render() {
    const { color, input: { name, onChange, checked }, type, id, className, datasetColor, isChecked } = this.props;
    return (
      <div className={`${className}`}>
        <input type={type} id={id} className={`_checkbox ${color}`} name={name} onChange={onChange}
               data-color={`${datasetColor}`} value={color} checked={isChecked}/>
        <label htmlFor={id} className='_checkbox-label'>
          <div className="tick_mark"></div>
        </label>
      </div>
    );
  }
}

CustomCheckbox.defaultProps = {
  color: "blue"
};

CustomCheckbox.propTypes = {
  classes: PropTypes.object,
  color: PropTypes.string
};

export default CustomCheckbox;
