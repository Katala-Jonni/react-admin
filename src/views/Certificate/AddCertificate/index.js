import { connect } from "react-redux";
import AddCertificate from "./AddCertificate";
import {
  getCertificate,
  getIsCertificate,
  getVerifyMessage,
  loadNumberCertificate
} from "../../../modules/Certificate";

const mapStateFromProps = state => ({
  certificate: getCertificate(state),
  isCertificate: getIsCertificate(state),
  verifyMessage: getVerifyMessage(state)
});

const mapDispatchFromProps = { loadNumberCertificate };

export default connect(mapStateFromProps, mapDispatchFromProps)(AddCertificate);
