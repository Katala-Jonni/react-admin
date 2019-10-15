import { connect } from "react-redux";
import AddCertificate from "./AddCertificate";
import {
  getCertificate,
  getIsCertificate,
  getVerifyMessage,
  loadNumberCertificate, startVerifyCertificate
} from "../../../modules/Certificate";

const mapStateFromProps = state => ({
  certificate: getCertificate(state),
  isCertificate: getIsCertificate(state),
  verifyMessage: getVerifyMessage(state)
});

const mapDispatchFromProps = { loadNumberCertificate, startVerifyCertificate };

export default connect(mapStateFromProps, mapDispatchFromProps)(AddCertificate);
