import React, { Component, Fragment } from "react";
import propTypes from "prop-types";
import classNames from "classnames";
import Select from "react-select";
import mastersData from "../../../modules/Calendar/mastersData";
import { connect } from "react-redux";
import { changeMasters, getResource, getTotalMasters } from "../../../modules/Calendar";
import AddMaster from "./AddMaster";

class EditItems extends Component {

  state = {
    startValue: null,
    endValue: null
  };

  static get propTypes() {
    return {
      classes: propTypes.object.isRequired
    };
  }

  static get defaultProps() {
    return {};
  }

  handleOnChangeSelectStart = data => {
    // const items = Array.isArray(data) ? data : [data];
    // const newData = items.map(item => {
    //   return {
    //     resourceId: item.value,
    //     resourceTitle: item.value
    //   };
    // });
    this.setState({
      startValue: data
    });
  };

  getTitleOptions = () => this.props.resource.map(item => item.resourceTitle);

  getOptions = () => this.props.masters.filter(item => {
    return !this.getTitleOptions().includes(item.value);
  });

  handleOnChangeSelectEnd = data => {
    // console.log(data, "end");
    // this.setState({
    //   endValue: data
    // });
    // this.props.handleEdit('name');
    console.log(this.props);
    this.props.changeState({
      startValue: this.state.startValue,
      endValue: data,
      // date: this.props.date
    });
  };

  render() {
    const { classes, startOptions } = this.props;
    const { startValue, endValue } = this.state;
    // console.log(startValue, "startValue");
    // console.log(endValue, "endValue");
    return (
      <Fragment>
        <Select
          className={classNames(classes.mBottom, "basic-single")}
          classNamePrefix="select"
          name="masters"
          options={startOptions}
          placeholder="Выберите что НЕ нужно ..."
          isClearable
          maxMenuHeight={200}
          onChange={this.handleOnChangeSelectStart}
        />
        <Select
          className={classNames(classes.bottom, "basic-single")}
          classNamePrefix="select"
          name="masters"
          options={this.state.startValue ? this.getOptions() : []}
          // options={this.state.startValue ? this.getOptions() : []}
          placeholder="Выберите что нужно ..."
          isClearable
          maxMenuHeight={200}
          onChange={this.handleOnChangeSelectEnd}
        />
      </Fragment>

    );
  }
}

const mapStateFromProps = state => ({
  resource: getResource(state),
  masters: getTotalMasters(state)
});

const mapDispatchFromProps = { changeMasters };

export default connect(mapStateFromProps, mapDispatchFromProps)(EditItems);
