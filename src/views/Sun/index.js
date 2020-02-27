import { connect } from "react-redux";
import Sun from "./Sun";
import {
  getCard,
  getError,
  getIsVerifyCard,
  getServerMessage,
  resetErrorMessage,
  sendCard,
  deleteState
} from "../../modules/Sun";

const mapStateFromProps = state => ({
  card: getCard(state),
  serverMessage: getServerMessage(state),
  errorMessage: getError(state),
  isVerifyCard: getIsVerifyCard(state)
});

const mapDispatchFromProps = { sendCard, resetErrorMessage, deleteState };

export default connect(mapStateFromProps, mapDispatchFromProps)(Sun);
