import { connect } from "react-redux";
import AddCard from "./AddCard";
import { getServerMessage, getError } from "modules/Sun";
import { getIsCard, getIsVerifyCard, getVerifyMessage, startVerifyCard } from "../../../modules/Sun";

const mapStateFromProps = state => ({
  serverMessage: getServerMessage(state),
  errorMessage: getError(state),
  isVerifyCard: getIsVerifyCard(state),
  verifyMessage: getVerifyMessage(state),
  isCard: getIsCard(state)
});

const mapDispatchFromProps = { startVerifyCard };

export default connect(mapStateFromProps, mapDispatchFromProps)(AddCard);
