import React, { Component } from "react";
import PropTypes from "prop-types";

// core components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

// @material-ui/icons
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";

class ListServices extends Component {
  state = {
    open: this.props.open
  };

  handleClick = () => {
    this.setState({
      open: !this.state.open
    });
  };

  getOptions = () => {
    const { options, isFull, isSpend } = this.props;
    if (!options) {
      return [];
    }
    let data = options.servicesType.map((item) => item.label);
    if (isFull) {
      if (options.history.length) {
        options.history.forEach((item) => {
          if (item.list.length) {
            const list = item.list.map((elem) => elem.label);
            data.push(...list);
          }
        });
      }
    } else if (isSpend) {
      // data = options.history.map((item) => item.label);
      data = [];
      if (options.history.length) {
        options.history.forEach((item) => {
          if (item.list.length) {
            const list = item.list.map((elem) => elem.label);
            data.push(...list);
          }
        });
      }
    }
    // return [];
    return data.map((item, idx) => {
      return (
        <ListItem button={false} key={idx}>
          <ListItemIcon>
            <StarBorder
              color={idx % 2 === 0 ? "primary" : "secondary"}
            />
          </ListItemIcon>
          <ListItemText primary={item}/>
        </ListItem>
      );
    });
  };

  render() {
    const { description } = this.props;
    const { open } = this.state;
    return (
      <List component="nav">
        <ListItem button onClick={this.handleClick}>
          <ListItemText primary={description}/>
          {open ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {this.getOptions()}
          </List>
        </Collapse>
      </List>
    );
  }
}

ListServices.defaultProps = {
  description: "description",
  open: false
};

ListServices.propTypes = {
  classes: PropTypes.object,
  options: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  description: PropTypes.string,
  open: PropTypes.bool
};

export default ListServices;
