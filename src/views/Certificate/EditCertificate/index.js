import { connect } from "react-redux";
import EditCertificate from "./EditCertificate";
import {
  getCertificate,
  getLoader,
  getLoaderCertificate,
  getVerifyMessage,
  startSearchNumber,
  turnOnLoaderCertificate,
  deleteState
} from "../../../modules/Certificate";

const mapStateFromProps = state => ({
  certificate: getCertificate(state),
  loader: getLoader(state),
  loaderCertificate: getLoaderCertificate(state),
  verifyMessage: getVerifyMessage(state)
});

const mapDispatchFromProps = { startSearchNumber, turnOnLoaderCertificate, deleteState };

export default connect(mapStateFromProps, mapDispatchFromProps)(EditCertificate);
