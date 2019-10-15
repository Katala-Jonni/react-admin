import { connect } from "react-redux";
import Certificate from "./Certificate";
import { getCertificate } from "../../modules/Certificate";
import { sendCertificate } from "../../modules/Certificate/actions";

const mapStateFromProps = state => ({
  // certificate: getCertificate(state)
});

const mapDispatchFromProps = { sendCertificate };

export default connect(null, mapDispatchFromProps)(Certificate);
