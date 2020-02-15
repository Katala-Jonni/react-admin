import React from "react";
import PropTypes from "prop-types";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";

// material-ui components
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "components/Snackbar/Snackbar.jsx";

// @material-ui/icons
import Search from "@material-ui/icons/Search";
import Add from "@material-ui/icons/Add";
import AddAlert from "@material-ui/icons/AddAlert";
import AddCertificate from "./AddCertificate";
import EditCertificate from "./EditCertificate";

const styles = {
  pageSubcategoriesTitle: {
    color: "#3C4858",
    textDecoration: "none",
    textAlign: "center"
  }
};


class Certificate extends React.Component {
  state = {
    tr: false
  };

  componentWillUnmount() {
    this.props.deleteState();
  }

  handleSubmit = values => {
    const { sendCertificate } = this.props;
    console.log(values);
    sendCertificate(values);
    // console.log(values);
    // console.log(rest);
    // const { sendCard } = this.props;
    // sendCard(values);
    // console.log("Отправленно!");
    // this.showNotification();
  };


  handleTabs = () => {
    console.log(this.props);
  };

  getTabs = () => {
    return [
      {
        tabButton: "Найти",
        tabIcon: Search,
        tabContent: (<EditCertificate/>),
        dataName: "Найти".toLowerCase()
      },
      {
        tabButton: "Новый",
        tabIcon: Add,
        tabContent: (<AddCertificate onSubmit={this.handleSubmit}/>),
        dataName: "Новый".toLowerCase()
      }
    ];
  };

  showNotification = place => {
    if (!this.state[place]) {
      this.setState({
        tr: true
      });
      this.timer = setTimeout(
        () => {
          this.props.resetErrorMessage();
          this.setState({
            tr: false
          });
        },
        5000
      );
    }
  };

  closeNotification = () => {
    this.props.resetErrorMessage();
    this.setState({ tr: false });
  };

  render() {
    const { tr } = this.state;
    const { serverMessage, errorMessage } = this.props;
    return (
      <div>
        <GridContainer justify="center">
          <Snackbar
            place="tr"
            color="success"
            icon={AddAlert}
            message={serverMessage || ""}
            open={serverMessage && !errorMessage && tr}
            closeNotification={this.closeNotification}
            close
          />
          <ItemGrid xs={12}>
            <NavPills
              color="success"
              alignCenter
              tabs={this.getTabs()}
              handleTabs={this.handleTabs}
            />
          </ItemGrid>
        </GridContainer>
      </div>
    );
  }
}

Certificate.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  serverMessage: PropTypes.string,
  errorMessage: PropTypes.bool
};

export default withStyles(styles)(Certificate);
