import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CertificateHistory from "../CertificateHistory";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "100%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});


class CustomizedExpansionPanels extends Component {
  state = {
    isOpen: false
  };

  handleChange = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { classes, data } = this.props;
    const { isOpen } = this.state;

    return (
      <div>
        <ExpansionPanel expanded={isOpen} onChange={this.handleChange}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>История сертификата</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <CertificateHistory data={data}/>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

CustomizedExpansionPanels.defaultProps = {
  headingText: "История сертификата"
};

CustomizedExpansionPanels.propTypes = {
  classes: PropTypes.object,
  headingText: PropTypes.string
};

export default withStyles(styles)(CustomizedExpansionPanels);
