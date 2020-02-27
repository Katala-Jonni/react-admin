import { connect } from "react-redux";
import EditCard from "./EditCard";
import {
  deleteState,
  deleteUseCard,
  getCard,
  getLoader,
  getVerifyCardMessage,
  getVerifyCardNumber,
  getVerifyPhoneMessage,
  getVerifyPhoneNumber,
  getVerifyMessage,
  startSearchNumber,
  startSearchPhoneNumber,
  startUseCard, getCardStatus
} from "../../../modules/Sun";
import { turnOnLoader } from "../../../modules/Sun/actions";

const mapStateFromProps = state => ({
  card: getCard(state),
  isVerifyPhoneNumber: getVerifyPhoneNumber(state),
  isVerifyCardNumber: getVerifyCardNumber(state),
  verifyCardMessage: getVerifyCardMessage(state),
  verifyMessage: getVerifyMessage(state),
  verifyPhoneMessage: getVerifyPhoneMessage(state),
  loader: getLoader(state),
  cardStatus: getCardStatus(state)
});

const mapDispatchFromProps = {
  startSearchNumber,
  startSearchPhoneNumber,
  startUseCard,
  turnOnLoader,
  deleteUseCard,
  deleteState
};

export default connect(mapStateFromProps, mapDispatchFromProps)(EditCard);
