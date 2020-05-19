import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import GridContainer from "components/Grid/GridContainer.jsx";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Category from "./Category/Category";
import Card from "./Cards";
import Search from "./Search/Search";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import CartTable from "./Cart";
import Tooltip from "@material-ui/core/Tooltip";
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import Progress from "components/Progress/Progress";
import category from "./data/category";

import moment from "moment/min/moment-with-locales";

const styleShop = () => ({
  root: {
    flexGrow: 1
  }
});

class Shop extends Component {
  state = {
    categories: [],
    searchValue: null,
    viewCart: false,
    openViewCart: false,
    fullScreen: false,
    tr: false
  };

  componentDidMount() {
    // console.log(window.screenY);
    window.addEventListener("scroll", function() {
      // document.getElementById('showScroll').innerHTML = pageYOffset + 'px';
      console.log("test");
    });
    this.props.loadView();
  }

  componentWillUnmount() {
    // чистим, чтобы не было утечеки памяти
    clearInterval(this.timer);
  }

  changeViewCart = () => {
    this.setState({
      viewCart: true,
      openViewCart: false
    });
  };

  handleChangeCategory = event => {
    const { checked, name } = event.target;
    let categories = [...this.state.categories];

    if (!checked) {
      categories = categories.filter((el) => el !== name);
    } else {
      categories.push(name);
    }
    this.setState({ categories });
  };

  handleChangeInputSearch = event => this.setState({ searchValue: event.target.value });

  getFormattedWord = word => word.trim().toLowerCase();

  isContain = (word, value) => this.getFormattedWord(word).indexOf(this.getFormattedWord(value)) >= 0;

  getInitialData = () => {
    const { categories } = this.state;
    const { products } = this.props;
    let newData = [];

    if (!categories.length) {
      newData = [...products];
    } else {
      products.forEach(item => {
        if (categories.includes(item.categoryName)) {
          newData = [...newData, item];
        }
      });
    }

    return newData;
  };

  getSortData = () => {
    const { categories, searchValue } = this.state;
    const { products } = this.props;
    let data;

    if (categories.length && searchValue) {
      data = categories
        .reduce((start, item) => [...start, ...products.filter((el) => el.categoryName === item)], [])
        .filter(item => this.isContain(item.title, searchValue));
    }
    else if (searchValue && !categories.length) {
      data = this.getInitialData().filter(item => this.isContain(item.title, searchValue));
    }
    else {
      data = this.getInitialData();
    }

    return data;
  };

  handleClickCart = () => {
    const { changeSubmitSwitch } = this.props;
    this.setState({
      openViewCart: true
    });
    // this.props.changeSubmitSwitch(false);
    changeSubmitSwitch(false);
  };

  handleCloseViewCart = () => {
    const { changeSubmitSwitch } = this.props;
    this.setState({
      openViewCart: false,
      fullScreen: false
      // viewCart: false
    });
    // this.props.changeSubmitSwitch(true);
    changeSubmitSwitch(true);
  };

  handleCloseView = () => {
    this.setState({
      viewCart: false
    });
  };

  handleClickFullScreen = () => {
    this.setState({
      fullScreen: !this.state.fullScreen
    });
  };

  showNotification = place => {
    if (!this.state[place]) {
      this.setState({
        tr: true
      });
      this.timer = setTimeout(
        () => {
          this.setState({
            tr: false
          });
        },
        5000
      );
    }
  };

  render() {
    const { classes, totalCart, isSubmit, categories } = this.props;
    const { viewCart, openViewCart, fullScreen } = this.state;
    const data = this.getSortData();
    return (
      <div className={classes.root}>
        {data
          ? <Fragment>
            <Dialog
              maxWidth={"md"}
              open={openViewCart && !isSubmit}
              onClose={this.handleCloseViewCart}
              fullScreen={fullScreen}
              scroll="paper"
              aria-labelledby="max-width-dialog-title"
            >
              <DialogTitle id="max-width-dialog-title">
                Информация по заказу
              </DialogTitle>
              <DialogContent>
                {totalCart.length
                  ? <CartTable
                    handleCloseView={this.handleCloseView}
                    showNotification={this.showNotification}
                  />
                  : null
                }

              </DialogContent>
              <DialogActions>
                <Button
                  onClick={this.handleClickFullScreen}
                  color={"primary"}
                  variant="contained"
                >
                  {fullScreen ? "Обычный экран" : "Во весь экран"}
                </Button>
                <Button
                  onClick={this.handleCloseViewCart}
                  color={"primary"}
                  variant="contained"
                >
                  Закрыть
                </Button>
              </DialogActions>
            </Dialog>
            <GridContainer spacing={16}>
              <ItemGrid xs={12} sm={12} md={3}>
                <Snackbar
                  place="tr"
                  color="success"
                  icon={AddAlert}
                  message="Заказ оформлен"
                  open={this.state.tr}
                  closeNotification={() => this.setState({ tr: false })}
                  close
                />
              </ItemGrid>
              {categories.length && data.length
                ? <Grid item xs={viewCart || totalCart.length ? 11 : 12}>
                  <Search
                    handleChange={this.handleChangeInputSearch}
                  />
                </Grid>
                : null
              }
              {viewCart || totalCart.length
                ? <Grid item xs={1}>
                  <Badge className={classes.margin} badgeContent={totalCart.length} color="secondary">
                    <Tooltip title={"Посмотреть корзину"} aria-label={"Посмотреть корзину"}>
                      <IconButton onClick={this.handleClickCart}>
                        <ShoppingCart fontSize={"large"} color={"primary"}/>
                      </IconButton>
                    </Tooltip>
                  </Badge>
                </Grid>
                : null
              }
              {categories.length && data.length
                ? <Fragment>
                  <Grid item xs={12} md={3} lg={3} xl={2}>
                    <Category
                      handleChange={this.handleChangeCategory}
                      categories={categories}
                    />
                  </Grid>
                  <Grid item xs={12} md={9} lg={9} xl={10} container spacing={16}>
                    {data.map(el => {
                      return (
                        <Grid item xs={12} sm={6} md={6} lg={4} xl={2} key={el._id}>
                          <Card
                            product={el}
                            changeViewCart={this.changeViewCart}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Fragment>
                : null
              }
            </GridContainer>
          </Fragment>
          : <Progress/>
        }
      </div>
    );
  }
}

Shop.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styleShop)(Shop);
