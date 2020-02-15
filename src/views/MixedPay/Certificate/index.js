import { connect } from "react-redux";
import Certificate from "./Certificate";
import {
  changeType,
  getCurrentCertificate,
  startEditCertificate,
  startSearchCertificate,
  getCertificate
} from "../../../modules/MixedPay";
import { getTotalCart } from "../../../modules/Shop";
import { getCertificate as naturalCertificate } from "../../../modules/Certificate";

const mapStateFromProps = state => ({
  certificate: getCertificate(state),
  // certificate: getCertificate(state),
  // currentCertificate: getCurrentCertificate(state),
  currentCertificate: naturalCertificate(state),
  totalCart: getTotalCart(state)
});

const mapDispatchFromProps = { startSearchCertificate, changeType, startEditCertificate };

export default connect(mapStateFromProps, mapDispatchFromProps)(Certificate);
