import { connect } from "react-redux";
import EditCard from "./EditCard";
import {
  getCard, getVerifyCardMessage,
  getVerifyCardNumber, getVerifyPhoneMessage,
  getVerifyPhoneNumber,
  startSearchNumber,
  startSearchPhoneNumber
} from "../../../modules/Sun";
// import { getServerMessage, getError } from "modules/Sun";
// import { getIsVerifyCard, getVerifyMessage, startVerifyCard } from "../../../modules/Sun";

const mapStateFromProps = state => ({
  card: getCard(state),
  isVerifyPhoneNumber: getVerifyPhoneNumber(state),
  isVerifyCardNumber: getVerifyCardNumber(state),
  verifyCardMessage: getVerifyCardMessage(state),
  verifyPhoneMessage: getVerifyPhoneMessage(state)
  // serverMessage: getServerMessage(state),
  // errorMessage: getError(state),
  // isVerifyCard: getIsVerifyCard(state),
  // verifyMessage: getVerifyMessage(state)
});

const mapDispatchFromProps = { startSearchNumber, startSearchPhoneNumber };

export default connect(mapStateFromProps, mapDispatchFromProps)(EditCard);
