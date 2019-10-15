import { connect } from "react-redux";
import Certificate from "./Certificate";
import {
  changeType, getCertificate,
  getCurrentCertificate,
  startEditCertificate,
  startSearchCertificate
} from "../../../modules/Template";
import { getTotalCart } from "../../../modules/Shop";

const mapStateFromProps = state => ({
  certificate: getCertificate(state),
  currentCertificate: getCurrentCertificate(state),
  totalCart: getTotalCart(state)
});

const mapDispatchFromProps = { startSearchCertificate, changeType, startEditCertificate };

export default connect(mapStateFromProps, mapDispatchFromProps)(Certificate);
