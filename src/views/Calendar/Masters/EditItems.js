import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Select from "react-select";
import { connect } from "react-redux";
import { changeMasters, getResource, getTotalMasters } from "../../../modules/Calendar";

class EditItems extends Component {
  state = {
    startValue: null,
    endValue: null
  };

  handleOnChangeSelectStart = data => this.setState({ startValue: data });

  getTitleOptions = () => this.props.resource.map(item => item.resourceTitle);

  getOptions = () => this.props.masters.filter(item => {
    return !this.getTitleOptions().includes(item.value);
  });

  handleOnChangeSelectEnd = data => {
    this.props.changeState({
      startValue: this.state.startValue,
      endValue: data
    });
  };

  render() {
    const {
      classes,
      startOptions,
      placeholderDelete,
      placeholderAdd,
      menuHeight
    } = this.props;
    return (
      <Fragment>
        <Select
          isClearable
          classNamePrefix="select"
          name="mastersDelete"
          options={startOptions}
          placeholder={placeholderDelete}
          maxMenuHeight={menuHeight}
          className={classNames(classes.mBottom)}
          onChange={this.handleOnChangeSelectStart}
        />
        <Select
          isClearable
          classNamePrefix="select"
          name="mastersAdd"
          placeholder={placeholderAdd}
          maxMenuHeight={menuHeight}
          className={classNames(classes.bottom)}
          options={this.state.startValue ? this.getOptions() : []}
          onChange={this.handleOnChangeSelectEnd}
        />
      </Fragment>
    );
  }
}

EditItems.defaultProps = {
  placeholderDelete: "Выберите что НЕ нужно ...",
  placeholderAdd: "Выберите что нужно ...",
  menuHeight: 200
};

EditItems.propTypes = {
  classes: PropTypes.object,
  resource: PropTypes.arrayOf(PropTypes.object).isRequired,
  masters: PropTypes.arrayOf(PropTypes.object).isRequired,
  startOptions: PropTypes.array.isRequired,
  changeMasters: PropTypes.func.isRequired,
  changeState: PropTypes.func.isRequired,
  placeholderDelete: PropTypes.string,
  placeholderAdd: PropTypes.string,
  menuHeight: PropTypes.number
};

const mapStateFromProps = state => ({
  resource: getResource(state),
  masters: getTotalMasters(state)
});

const mapDispatchFromProps = { changeMasters };

export default connect(mapStateFromProps, mapDispatchFromProps)(EditItems);
