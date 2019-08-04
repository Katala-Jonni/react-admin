import { connect } from "react-redux";
import EditCard from "./EditCard";
import {
  deleteUseCard,
  getCard,
  getLoader,
  getVerifyCardMessage,
  getVerifyCardNumber,
  getVerifyPhoneMessage,
  getVerifyPhoneNumber,
  startSearchNumber,
  startSearchPhoneNumber,
  startUseCard
} from "../../../modules/Sun";
import { turnOnLoader } from "../../../modules/Sun/actions";

const mapStateFromProps = state => ({
  card: getCard(state),
  isVerifyPhoneNumber: getVerifyPhoneNumber(state),
  isVerifyCardNumber: getVerifyCardNumber(state),
  verifyCardMessage: getVerifyCardMessage(state),
  verifyPhoneMessage: getVerifyPhoneMessage(state),
  loader: getLoader(state)
});

const mapDispatchFromProps = { startSearchNumber, startSearchPhoneNumber, startUseCard, turnOnLoader, deleteUseCard };

export default connect(mapStateFromProps, mapDispatchFromProps)(EditCard);
