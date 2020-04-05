import React, { Component } from "react";
import PropTypes from "prop-types";
import "date-fns";
import "moment/locale/ru";
import cx from "classnames";

import Member from "../Member";
import Button from "@material-ui/core/Button";

class RenderMembers extends Component {
  state = {
    switch: true
  };

  componentDidMount() {
    const { fields, ignoreMembers } = this.props;

    const keysMember = Object.keys(ignoreMembers);
    if (keysMember.length) {
      keysMember.forEach((item) => {
        if (ignoreMembers[item].servicesGroup) {
          fields.push({
            servicesGroup: ignoreMembers[item].servicesGroup,
            count: ignoreMembers[item].count
          });
        }
      });
    }
  }

  handleClickButton = () => {
    const { fields } = this.props;
    return fields.push(this.getDefaultService());
    // return fields.push({});
  };

  onChangeIgnoreMember = ({ index, value }) => {
    this.props.changeIgnoreMembers({ index, value });
  };

  getServices = () => {
    if (!this.props.services.length) {
      return [];
    }
    const groups = Object.keys(this.props.ignoreMembers)
      .map((item) => {
        if (this.props.ignoreMembers[item]) {
          return this.props.ignoreMembers[item].servicesGroup;
        }
      });
    return this.props.services
      .map((item) => {
        if (!groups.includes(item.title)) {
          return {
            value: item.title,
            label: item.title
          };
        }
      })
      .filter((el) => el);
  };

  getDefaultService = () => {
    return {
      servicesGroup: this.getServices()[0].value,
      count: 50
    };
  };

  render() {
    const { fields, classes, isDisabledBtn, noButton, btnText, services, todo, ignoreMembers, deleteIgnoreMembers, keys } = this.props;
    return (
      <ul className={cx(classes.list, classes.topMargin2)}>
        {noButton
          ? null
          : <li>
            <Button
              type="button"
              color='primary'
              variant="contained"
              size="small"
              className={classes.addButton}
              disabled={services.length === Object.keys(ignoreMembers).length}
              // disabled={isDisabledBtn || services.length === Object.keys(ignoreMembers).length}
              onClick={this.handleClickButton}
            >
              {btnText}
            </Button>
          </li>
        }
        {fields.map((member, index, props) => {
          // console.log(props.getAll());
          // console.log(this.getServices()[0]);
          // console.log(props.get(index));
          if (props.get(index).servicesGroup) {
            return (
              <li key={index}>
                <Member
                  member={member}
                  index={index}
                  memberValue={props.get(index).servicesGroup ? props.get(index) : this.getDefaultService()}
                  options={this.getServices()}
                  classes={classes}
                  fields={fields}
                  noButton={noButton}
                  services={services}
                  todo={todo}
                  onChangeIgnoreMember={this.onChangeIgnoreMember}
                  deleteIgnoreMembers={deleteIgnoreMembers}
                  ignoreMembers={ignoreMembers}
                />
              </li>
            );
          } else {
            return null;
          }


        })}
      </ul>
    );
  }
}

RenderMembers.defaultProps = {
  btnText: "Добавить исключение"
};

RenderMembers.propTypes = {
  classes: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  isDisabledBtn: PropTypes.bool,
  noButton: PropTypes.bool,
  btnText: PropTypes.string
};

export default RenderMembers;
