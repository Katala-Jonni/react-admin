import { deleteUseCard, getCard, getLoader, getVerifyCardMessage, getVerifyCardNumber } from "../../../modules/Sun";
import { turnOnLoader } from "../../../modules/Sun/actions";
import { connect } from "react-redux";
import EditCard from "../../Sun/EditCard/EditCard";
import CertificateView from "./CertificateView";
import {
  endSearchNumber,
  getCertificate,
  getIsCertificate,
  getVerifyMessage,
  startSearchNumber
} from "../../../modules/Certificate";

const mapStateFromProps = state => ({
  // card: getCard(state),
  // isVerifyPhoneNumber: getVerifyPhoneNumber(state),
  // isVerifyCardNumber: getVerifyCardNumber(state),
  // verifyCardMessage: getVerifyCardMessage(state),
  // verifyPhoneMessage: getVerifyPhoneMessage(state),
  // loader: getLoader(state)
  certificate: getCertificate(state),
  isCertificate: getIsCertificate(state),
  verifyMessage: getVerifyMessage(state)
});

const mapDispatchFromProps = { startSearchNumber, endSearchNumber };

export default connect(mapStateFromProps, mapDispatchFromProps)(CertificateView);
