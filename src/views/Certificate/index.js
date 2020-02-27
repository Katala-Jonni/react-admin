import { connect } from "react-redux";
import Certificate from "./Certificate";
// import { sendCertificate } from "../../modules/Certificate/actions";
import { deleteState, getCertificate, getIsCertificate, sendCertificate } from "../../modules/Certificate";
import { getProducts } from "../../modules/Shop";

const mapStateFromProps = state => ({
  // form: state.form
});

const mapDispatchFromProps = { sendCertificate, deleteState };

export default connect(mapStateFromProps, mapDispatchFromProps)(Certificate);
