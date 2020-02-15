import { connect } from "react-redux";
import AddCertificate from "./AddCertificate";
import {
  getCertificate,
  getIsCertificate,
  getVerifyMessage,
  loadNumberCertificate, startVerifyCertificate
} from "../../../modules/Certificate";
import { getProducts, loadView } from "../../../modules/Shop";

const mapStateFromProps = state => ({
  certificate: getCertificate(state),
  isCertificate: getIsCertificate(state),
  verifyMessage: getVerifyMessage(state),
  products: getProducts(state)
});

const mapDispatchFromProps = { loadNumberCertificate, startVerifyCertificate, loadView };

export default connect(mapStateFromProps, mapDispatchFromProps)(AddCertificate);
