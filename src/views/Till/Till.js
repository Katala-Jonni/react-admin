import React from "react";
import PropTypes from "prop-types";
import moment from "moment/min/moment-with-locales";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";

// material-ui components
import { withStyles } from "@material-ui/core/styles";


// @material-ui/icons
import Permidentity from "@material-ui/icons/PermIdentity";
import TillTables from "./TillTables";
import ResultTable from "./ResultTable";
import EmptyView from "./EmptyView";
import TillHeader from "./TillHeader";
import TillInfo from "./TillInfo";

const styles = {
  pageSubcategoriesTitle: {
    color: "#3C4858",
    textDecoration: "none",
    textAlign: "center"
  }
};

class Till extends React.Component {
  // state = {
  //   time: moment().format("LTS")
  // };

  getViewTillInfo = value => {
    console.log(value);
  };

  getTotalTabs = () => {
    const { totalDay } = this.props;
    let keys = Object.keys(totalDay);
    keys = [...keys, "Касса"];
    const data = keys.map(name => {
      if (name.toLowerCase() === "касса") {
        return {
          tabButton: name,
          tabIcon: Permidentity,
          tabContent: (<ResultTable data={totalDay} head={name}/>),
          dataName: name.toLowerCase(),
          getViewTillInfo: this.getViewTillInfo
        };
      }
      return {
        tabButton: name,
        tabIcon: Permidentity,
        tabContent: (<TillTables data={totalDay[name]} head={name}/>),
        dataName: name.toLowerCase()
      };
    });
    // return data.length > 1 ? data : [];
    return data;
  };

  render() {
    const { classes, title, changeTill, tillInfoView } = this.props;
    return (
      <div>
        <GridContainer justify="center">
          <ItemGrid xs={12} container alignContent={"center"} alignItems={"baseline"}>
            <ItemGrid xs={7} sm={6} lg={8} xl={10} item>
              <TillHeader classes={classes} title={title}/>
            </ItemGrid>
            <ItemGrid xs={3} sm={6} lg={4} xl={2} item>
              {tillInfoView
                ? <TillInfo/>
                : null
              }
            </ItemGrid>
          </ItemGrid>
          <ItemGrid xs={12}>
            {this.getTotalTabs().length
              ? <NavPills
                color="warning"
                alignCenter
                tabs={this.getTotalTabs()}
                changeTill={changeTill}
              />
              : <EmptyView/>
            }
          </ItemGrid>
        </GridContainer>
      </div>
    );
  }
}

Till.defaultProps = {
  title: "Касса"
};

Till.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string
};

export default withStyles(styles)(Till);
