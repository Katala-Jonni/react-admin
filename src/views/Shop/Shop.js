import React from "react";
import PropTypes from "prop-types";
import GridContainer from "components/Grid/GridContainer.jsx";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Category from "./Category/Category";
import Card from "./Cards/Card";
import totalCards from "./data/data";
import Search from "./Search/Search";

const styleShop = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  gridList: {
    width: 500,
    height: 450
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
});

class Shop extends React.Component {
  state = {
    categories: {},
    searchValue: null
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
      console.log("getInitialData1");
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
      console.log("test1");
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

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <GridContainer spacing={16}>
          <Grid item xs={12}>
            <Search
              handleChange={this.handleChangeInputSearch}
            />
          </Grid>
          <Grid item xs={12} md={3} lg={3} xl={2}>
            <Category
              handleChange={this.handleChangeCategory}
            />
          </Grid>
          <Grid item xs={12} md={9} lg={9} xl={10} container spacing={16}>
            {this.getSortData().map(el => {
              return (
                <Grid item xs={12} xl={2} md={6} lg={4} key={el.id}>
                  <Card product={el}/>
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
