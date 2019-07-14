import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment/min/moment-with-locales";

class TillHeader extends Component {
  state = {
    time: moment().format("LTS")
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        time: moment().format("LTS")
      });
    }, 1000);
  }

  render() {
    const { classes, title } = this.props;
    const { time } = this.state;
    return (
      <h3 className={classes.pageSubcategoriesTitle}>
        {title} {moment().format("DD.MM.YY")} {time}
      </h3>
    );
  }
}

TillHeader.defaultProps = {};

TillHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default TillHeader;
