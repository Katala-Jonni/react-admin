import React from "react";
import PropTypes from "prop-types";
import moment from "moment/min/moment-with-locales";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";

import AddCard from "./AddCard";
import EditCard from "./EditCard";

// material-ui components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Snackbar from "components/Snackbar/Snackbar.jsx";


// @material-ui/icons
import Search from "@material-ui/icons/Search";
import Add from "@material-ui/icons/Add";
import AddAlert from "@material-ui/icons/AddAlert";
import { deleteState } from "../../modules/Sun";


// import tabs from "./tabs";

const styles = {
  pageSubcategoriesTitle: {
    color: "#3C4858",
    textDecoration: "none",
    textAlign: "center"
  }
};

// class Sun extends React.Component {
//   state = {
//     tr: false
//   };
//
//   handleSubmit = values => {
//     const { sendCard } = this.props;
//     sendCard(values);
//     console.log("Отправленно!");
//     this.showNotification();
//   };
//
//   getTabs = () => {
//     return [
//       {
//         tabButton: "Найти",
//         tabIcon: Search,
//         tabContent: (<EditCard/>),
//         dataName: "Найти".toLowerCase()
//       },
//       {
//         tabButton: "Новый",
//         tabIcon: Add,
//         tabContent: (<AddCard onSubmit={this.handleSubmit}/>),
//         dataName: "Новый".toLowerCase()
//       }
//     ];
//   };
//
//   showNotification = place => {
//     if (!this.state[place]) {
//       this.setState({
//         tr: true
//       });
//       this.timer = setTimeout(
//         () => {
//           this.props.resetErrorMessage();
//           this.setState({
//             tr: false
//           });
//         },
//         5000
//       );
//     }
//   };
//
//   closeNotification = () => {
//     this.props.resetErrorMessage();
//     this.setState({ tr: false });
//   };
//
//   render() {
//     const { tr } = this.state;
//     const { serverMessage, errorMessage } = this.props;
//     return (
//       <div>
//         <GridContainer justify="center">
//           <Snackbar
//             place="tr"
//             color="success"
//             icon={AddAlert}
//             message={serverMessage || ""}
//             open={serverMessage && !errorMessage && tr}
//             closeNotification={this.closeNotification}
//             close
//           />
//           <ItemGrid xs={12}>
//             <NavPills
//               color="danger"
//               alignCenter
//               tabs={this.getTabs()}
//             />
//           </ItemGrid>
//         </GridContainer>
//       </div>
//     );
//   }
// }
//
// Sun.defaultProps = {
//   title: "Касса"
// };
//
// Sun.propTypes = {
//   classes: PropTypes.object.isRequired,
//   title: PropTypes.string
// };


class Sun extends React.Component {
  state = {
    tr: false,
    changeViewTab: false,
    addCertificateTab: false,
    editCertificateTab: true
  };

  componentWillUnmount() {
    this.props.deleteState();
  }

  handleSubmit = values => {
    const { sendCard } = this.props;
    sendCard(values);
//     console.log("Отправленно!");
//     this.showNotification();
  };


  handleTabs = () => {
    this.setState({
      changeViewTab: !this.state.changeViewTab
    });
    this.props.deleteState();
  };

  handleAddCertificateTab = () => {
    this.props.deleteState();
    this.setState({
      addCertificateTab: true,
      editCertificateTab: false
    });
  };

  handleEditCertificateTab = () => {
    this.setState({
      addCertificateTab: false,
      editCertificateTab: true
    });
  };

  getTabs = () => {
    return [
      {
        tabButton: "Найти",
        tabIcon: Search,
        tabContent: this.state.editCertificateTab
          ? (<EditCard isViev={this.state.editCertificateTab}/>)
          : null,
        dataName: "Найти".toLowerCase()
      },
      {
        tabButton: "Новый",
        tabIcon: Add,
        tabContent: this.state.addCertificateTab
          ? (<AddCard onSubmit={this.handleSubmit} isViev={this.state.addCertificateTab}/>)
          : null,
        // tabContent: (<AddCertificate onSubmit={this.handleSubmit} isViev={this.state.addCertificateTab}/>),
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
              color="danger"
              alignCenter
              tabs={this.getTabs()}
              handleTabs={this.handleTabs}
              handleAddCertificateTab={this.handleAddCertificateTab}
              handleEditCertificateTab={this.handleEditCertificateTab}
            />
          </ItemGrid>
        </GridContainer>
      </div>
    );
  }
}

Sun.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  serverMessage: PropTypes.string,
  errorMessage: PropTypes.bool
};

export default withStyles(styles)(Sun);
// export default withStyles(styles)(Sun);
