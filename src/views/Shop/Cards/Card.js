import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import cx from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import Chip from "@material-ui/core/Chip";
import CardActionArea from "@material-ui/core/CardActionArea";
import Select from "react-select";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddButton from "./AddButtonCard";
import InputNumber from "../../../components/Inputs/InputNumber";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import getWorkHourBool from '../../../utils/getWorkHourBool';

const useStyles = theme => ({
  actionRoot: {
    display: "flex"
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 100,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  chip: {
    margin: theme.spacing.unit * 1
  },
  typography: {
    marginTop: theme.spacing.unit * 2,
    minHeight: 200
  },
  extendedIcon: {
    marginLeft: "auto"
  },
  pointer: {
    cursor: "pointer"
  }
});

const initialState = () => {
  return {
    countCart: 1,
    selectValue: null,
    expanded: null,
    viewNumber: false
  };
};

class RecipeReviewCard extends Component {
  state = {
    ...initialState()
  };

  handleChangeSelect = data => {
    this.setState({
      selectValue: data ? data.value : data
      // expanded: null
    });
  };

  handleExpandClick = () => {
    this.setState({
      expanded: !this.state.expanded,
      selectValue: null
    });
  };

  handleClickAddCart = () => {
    const getLowerCase = (value) => value.toLowerCase();
    const { product, changeViewCart, totalCart, categories, addToCartStart } = this.props;
    const { countCart, selectValue } = this.state;
    // поиск категории
    const targetCategory = categories.find(item => item.name.toLowerCase() === product.categoryName.toLowerCase());
    // выбор имени
    const value = selectValue ? selectValue : targetCategory.value;
    // console.log(totalCart, "totalCart");
    // console.log(product, "product");
    const cart = [...totalCart];
    let goods = cart.find(a => getLowerCase(a.name) === getLowerCase(value) && a._id === product._id);
    // let goods = totalCart.find(a => getLowerCase(a.name) === getLowerCase(value) && getLowerCase(a.title) === getLowerCase(product.title));

    // console.log(targetCategory, "targetCategory");
    // console.log(goods, "goods");
    // console.log(goods);
    if (goods) {
      goods.count = countCart;
      // goods = { ...goods, count: countCart };
      // cart.forEach((goods) => {
      //   if (getLowerCase(goods.name) === getLowerCase(value) && goods._id === product._id) {
      //     goods.count = countCart;
      //   }
      // });
    } else {
      goods = Object.assign({}, product, {
        count: countCart,
        name: value
      });
      cart.push(goods);
    }
    // console.log(value, "value");
    // console.log(selectValue, "selectValue");
    // console.log(countCart, "countCart");

    // console.log(goods, "afterGoods");
    changeViewCart();
    // console.log(totalCart);
    // console.log(goods);
    addToCartStart(cart);
    // addToCartStart(totalCart.filter(a => a._id !== goods._id).concat(goods));
    this.setState(initialState());
  };

  handleChangeCountCart = value => {
    this.setState({
      countCart: !value ? 1 : value
    });
  };

  handleClickAdd = () => this.setState({ countCart: ++this.state.countCart });

  handleClickRemove = () => this.setState({ countCart: this.state.countCart === 1 ? 1 : --this.state.countCart });

  getCurrentDayResource = () => {
    const currentResource = this.props.totalResource[moment().format("DD.MM.YY")];
    if (currentResource) {
      return currentResource
        .map(item => ({ label: item.resourceId, value: item.resourceId }))
        .filter(item => item.label.toLowerCase() !== "солярий");
    }
    return null;
  };

  handleClickViewNumber = () => {
    this.setState({
      viewNumber: true
    });
  };

  handleCloseViewNumber = () => {
    this.setState({
      viewNumber: false
    });
  };

  render() {
    const { classes, product, typographyResourceError, typographyResourcePlaceholder } = this.props;
    const { countCart, viewNumber } = this.state;

    return (
      <Card className={cx(classes.card)}>
        <CardActionArea>
          <CardHeader
            avatar={
              <Avatar
                src={"https://img2.pngindir.com/20180818/fij/kisspng-stock-illustration-image-vector-graphics-book-info-5b785caa96d5f0.2922021915346146986178.jpg"}
                aria-label="Recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            action={
              <Chip label={`${product.price} ₽`} className={classes.chip} color={"primary"} variant={"outlined"}/>
            }
          />
          <CardMedia
            className={cx(classes.media)}
            image={"https://img2.pngindir.com/20180818/fij/kisspng-stock-illustration-image-vector-graphics-book-info-5b785caa96d5f0.2922021915346146986178.jpg"}
            title={product.title}
          />
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary" component="h3">
              {product.title}
            </Typography>
          </CardContent>
        </CardActionArea>
        {getWorkHourBool()
          ? <CardActions className={classes.actionRoot}>
            <Tooltip title={"Уменьшить на один"} aria-label={"Уменьшить на один"}>
              <IconButton aria-label="Уменьшить на один" onClick={this.handleClickRemove}>
                <Remove color={"primary"}/>
              </IconButton>
            </Tooltip>
            {viewNumber
              ? <Dialog
                maxWidth={"xs"}
                open={viewNumber}
                onClose={this.handleCloseViewNumber}
                scroll="body"
              >
                <DialogTitle>
                  Введите количество
                </DialogTitle>
                <DialogContent>
                  <InputNumber
                    value={countCart}
                    onChange={this.handleChangeCountCart}
                    autoFocus
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={this.handleCloseViewNumber}
                    color={"primary"}
                    variant="contained"
                  >
                    Закрыть
                  </Button>
                </DialogActions>
              </Dialog>
              : <Tooltip title={"Ввести количество"} aria-label={"Ввести количество"}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  component="h3"
                  className={classes.pointer}
                  onClick={this.handleClickViewNumber}
                >
                  {countCart}
                </Typography>
              </Tooltip>
            }
            <Tooltip title={"Увеличить на один"} aria-label={"Увеличить на один"}>
              <IconButton aria-label="Увеличить на один" onClick={this.handleClickAdd}>
                <Add color={"primary"}/>
              </IconButton>
            </Tooltip>
            {product.isMaster
              ? <Tooltip title={"Выбрать мастера"} aria-label={"Выбрать мастера"}>
                <IconButton
                  className={cx({
                    [classes.expand]: classes.expand,
                    [classes.expandOpen]: this.state.expanded
                  })}
                  onClick={this.handleExpandClick}
                  aria-expanded={this.state.expanded}
                  aria-label="Добавить мастера"
                >
                  <ExpandMoreIcon/>
                </IconButton>
              </Tooltip>
              : null
            }
            {product.isMaster && this.state.selectValue
              ? <AddButton
                className={classes.extendedIcon}
                handleClickAddCart={this.handleClickAddCart}
              />
              : null
            }
            {!product.isMaster
              ? <AddButton
                className={classes.extendedIcon}
                handleClickAddCart={this.handleClickAddCart}
              />
              : null
            }
          </CardActions>
          : null
        }
        <Collapse in={this.state.expanded} timeout="auto" component={"div"}>
          <CardContent>
            <Typography component={"h6"}>Выберите мастера:</Typography>
            <Typography component={"div"} className={classes.typography}>
              {this.getCurrentDayResource() && this.state.expanded
                ? <Select
                  options={this.getCurrentDayResource()}
                  placeholder={typographyResourcePlaceholder}
                  minMenuHeight={150}
                  maxMenuHeight={150}
                  // menuIsOpen
                  isClearable
                  onChange={this.handleChangeSelect}
                />
                : !this.getCurrentDayResource() || !this.getCurrentDayResource().length ?
                  <Typography
                    variant={"subtitle2"}
                    color={"error"}
                    component={"h3"}
                  >
                    {typographyResourceError}
                  </Typography>
                  : null
              }
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

RecipeReviewCard.defaultProps = {
  totalResource: {},
  typographyResourcePlaceholder: "Начните печатать...",
  typographyResourceError: "Добавьте в календарь мастера"
};

RecipeReviewCard.propTypes = {
  product: PropTypes.object.isRequired,
  totalResource: PropTypes.object.isRequired,
  changeViewCart: PropTypes.func.isRequired,
  typographyResourceError: PropTypes.string
};

export default withStyles(useStyles)(RecipeReviewCard);
