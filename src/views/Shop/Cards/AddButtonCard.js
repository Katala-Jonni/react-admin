import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";
import Tooltip from "@material-ui/core/Tooltip";

const AddButton = props => {
  const { className, handleClickAddCart, title, color } = props;
  return (
    <Tooltip title={title} aria-label={title}>
      <IconButton
        className={className}
        onClick={handleClickAddCart}
      >
        <AddShoppingCart color={color}/>
      </IconButton>
    </Tooltip>
  );
};

AddButton.defaultProps = {
  title: "Добавить в корзину",
  color: "primary",
  className: ""
};

AddButton.propTypes = {
  handleClickAddCart: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  color: PropTypes.string
};

export default AddButton;
