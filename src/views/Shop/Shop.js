import React from "react";
import PropTypes from "prop-types";
import GridContainer from "components/Grid/GridContainer.jsx";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Category from "./Category/Category";
import Card from "./Cards";
import totalCards from "./data/data";
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
import Typography from "@material-ui/core/Typography";
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import { loadTotalDay } from "../../modules/Shop";

const styleShop = () => ({
  root: {
    flexGrow: 1
  }
});

class Shop extends React.Component {
  state = {
    categories: {},
    searchValue: null,
    viewCart: false,
    openViewCart: false,
    fullScreen: false,
    tr: false
  };

  componentDidMount() {
    // this.props.loadTotalDay();
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
    this.setState({ categories: { ...this.state.categories, [name]: checked } });
  };

  handleChangeInputSearch = event => this.setState({ searchValue: event.target.value });

  getFormattedWord = word => word.trim().toLowerCase();

  isContain = (word, value) => this.getFormattedWord(word).indexOf(this.getFormattedWord(value)) >= 0;

  getInitialData = () => {
    const { categories } = this.state;

    const dataKeys = Object.keys(totalCards);
    const isChecked = dataKeys.some(a => categories[a]);
    let newData = [];

    if (!isChecked && !newData.length) {
      newData = Object.values(totalCards)
        .filter(item => item.length)
        .reduce((start, item) => [...start, ...item], []);
    } else {
      dataKeys.forEach(item => {
        if (categories[item]) {
          newData = [...newData, ...totalCards[item]];
        }
      });
    }

    return newData;
  };

  getSortData = () => {
    const { categories, searchValue } = this.state;
    const categoriesKeys = Object.keys(categories);
    const validCategories = categoriesKeys.filter(el => categories[el]);

    let data;
    if (validCategories.length && searchValue) {
      data = validCategories
        .reduce((start, item) => [...start, ...totalCards[item]], [])
        .filter(item => this.isContain(item.title, searchValue));
    }
    else if (searchValue && !validCategories.length) {
      data = this.getInitialData().filter(item => this.isContain(item.title, searchValue));
    }
    else {
      data = this.getInitialData();
    }

    return data;
  };

  handleClickCart = () => {
    this.setState({
      openViewCart: true
    });
    this.props.changeSubmitSwitch(false);
  };

  handleCloseViewCart = () => {
    const { totalCart } = this.props;
    this.setState({
      openViewCart: false,
      fullScreen: false
      // viewCart: false
    });
    this.props.changeSubmitSwitch(true);
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
    const { classes, totalCart, isSubmit } = this.props;
    const { viewCart, openViewCart, fullScreen } = this.state;
    return (
      <div className={classes.root}>
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
          <Grid item xs={viewCart || totalCart.length ? 11 : 12}>
            <Search
              handleChange={this.handleChangeInputSearch}
            />
          </Grid>
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
          <Grid item xs={12} md={3} lg={3} xl={2}>
            <Category
              handleChange={this.handleChangeCategory}
            />
          </Grid>
          <Grid item xs={12} md={9} lg={9} xl={10} container spacing={16}>
            {this.getSortData().map(el => {
              return (
                <Grid item xs={12} sm={6} md={6} lg={4} xl={2} key={el.id}>
                  <Card
                    product={el}
                    changeViewCart={this.changeViewCart}
                  />
                </Grid>
              );
            })}
          </Grid>
        </GridContainer>
      </div>
    );
  }
}

Shop.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styleShop)(Shop);
