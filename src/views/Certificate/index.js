import { connect } from "react-redux";
import Certificate from "./Certificate";
import { sendCertificate } from "../../modules/Certificate/actions";

const mapDispatchFromProps = { sendCertificate };

export default connect(null, mapDispatchFromProps)(Certificate);
