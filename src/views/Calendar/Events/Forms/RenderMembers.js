import React, { Component } from "react";
import PropTypes from "prop-types";
import "date-fns";
import "moment/locale/ru";

import Member from "./Member";
import Button from "@material-ui/core/Button";

class RenderMembers extends Component {

  handleClickButton = () => {
    const { addField, fields } = this.props;
    addField();
    return fields.push({});
  };

  render() {
    const { fields, classes, isDisabledBtn, noButton, btnText } = this.props;
    return (
      <ul className={classes.list}>
        {noButton
          ? null
          : <li>
            <Button
              type="button"
              color='primary'
              variant="contained"
              size="small"
              className={classes.addButton}
              disabled={isDisabledBtn}
              onClick={this.handleClickButton}
            >
              {btnText}
            </Button>
          </li>
        }

        {fields.map((member, index) => {
          return (
            <li key={index}>
              <Member
                member={member}
                index={index}
                classes={classes}
                fields={fields}
                noButton={noButton}
              />
            </li>
          );
        })}
      </ul>
    );
  }
}

RenderMembers.defaultProps = {
  btnText: "Добавить запись"
};

RenderMembers.propTypes = {
  classes: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  addField: PropTypes.func.isRequired,
  isDisabledBtn: PropTypes.bool,
  noButton: PropTypes.bool,
  btnText: PropTypes.string
};

export default RenderMembers;
